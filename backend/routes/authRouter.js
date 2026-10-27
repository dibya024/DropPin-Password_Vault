const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/User");

const { randomInt, createHmac, timingSafeEqual } = require("node:crypto");

function hashOtp(otp) {
    const secret = process.env.OTP_HASH_SECRET;
    if (!secret) {
        throw new Error("OTP_HASH_SECRET is not configured.")
    }
    return createHmac("sha256", secret).update(otp).digest("hex");
}

router.post("/register", async (req, res) => {
    const { email, username, password } = req.body;
    if (typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        typeof username !== "string" ||
        !username.trim() ||
        username.trim().length > 40 ||
        typeof password !== "string" ||
        password.length < 8
    ) {
        return res.status(400).json({
            error: "Invalid email or password!"
        });
    }
    try {
        const normalizedEmail = email.trim().toLocaleLowerCase();
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            email: normalizedEmail,
            username: username.trim(),
            hashedPassword,
        });
        return res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Account already exists" })
        }
        console.error("SignUp failed:", error);
        return res.status(500).json({ error: "Unable to create account" })
    }
})


router.post("/login", async (req, res) => {
    const { identifier, password } = req.body || {};

    if (typeof identifier !== "string" || !identifier.trim() || typeof password !== "string") {
        return res.status(400).json({ error: "Enter your email or username and password." })
    }
    try {
        const normalizedIdentifier = identifier.trim().toLowerCase();
        const user = await User.findOne({
            $or: [
                { email: normalizedIdentifier },
                { username: normalizedIdentifier },
            ],
        }).select("+hashedPassword");

        if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        req.session.regenerate((error) => {
            if (error) {
                console.log("Unable to create login session:", error);
                return res.status(500).json({ error: "Unable to login" });
            }
            req.session.userId = user._id.toString();

            req.session.save((saveError) => {
                if (saveError) {
                    console.error("Unable to save login session:", saveError);
                    return res.status(500).json({ error: "Unable to login" });
                }
                return res.status(200).json({
                    user: {
                        id: user._id,
                        email: user.email,
                        username: user.username,
                        emailVerified: user.emailVerified,
                    },
                });
            });
        });
    } catch (error) {
        console.log("Login failed:", error);
        return res.status(500).json({ error: "Unable to Login" });
    }
})


router.get("/me", async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ error: "Not authenticated yet!" });
    }
    try {
        const user = await User.findById(userId).select("_id email username emailVerified");

        if (!user) {
            return res.status(401).json({ error: "Authentication Required!" });

        }
        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                emailVerified: user.emailVerified,
            },
        });
    } catch (error) {
        console.log("Session verification failed: ", error);
        return res.status(500).json({ error: "Unable to check session!" });
    }
});


router.post("/email-verification/request", async (req, res, next) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ error: "Authentication required!" });
    }
    try {
        const user = await User.findById(userId).select("+emailVerificationLastSentAt");
        if (!user) {
            return res.status(401).json({ error: "Authentication required!" });
        }
        if (user.emailVerified) {
            return res.status(400).json({ error: "Email is already verified!" });
        }
        const cooldownsMs = 60 * 1000;
        const lastSentAt = user.emailVerificationLastSentAt?.getTime();

        if (lastSentAt && Date.now() - lastSentAt < cooldownsMs) {
            return res.status(429).json({ error: "Please wait for sometime before requesting again." })
        }
        const otp = String(randomInt(100000, 1000000));
        const now = new Date();

        user.emailVerificationOTPHash = hashOtp(otp);
        user.emailVerificationExpiresAt = new Date(now.getTime() + 10 * 60 * 1000);
        user.emailVerificationAttempts = 0;
        user.emailVerificationLastSentAt = now;
        await user.save();

        const clearVerificationRequest = async () => {
            user.emailVerificationOTPHash = undefined;
            user.emailVerificationExpiresAt = undefined;
            user.emailVerificationAttempts = 0;
            user.emailVerificationLastSentAt = undefined;
            await user.save();
        };

        let emailResponse;
        try {
            emailResponse = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
                body: JSON.stringify({
                from: process.env.EMAIL_FROM,
                to: [user.email],
                subject: "Your DropPin verification code",
                    text: `Your 6 digit verification code is ${otp}. Expires in 10 minutes.`
                }),
            });
        } catch (error) {
            await clearVerificationRequest();
            throw error;
        }

        if (!emailResponse.ok) {
            await clearVerificationRequest();

            return res.status(502).json({ error: "Unable to send verification code. Please try again later." });
        }
        return res.status(200).json({
            message: "A verification code has been sent to your registered email.",
        });
    } catch (error) {
        console.log("Email verification failed : ", error);
        return res.status(500).json({
            error: "unable to request an email verification"
        })
    }
});


router.post("/email-verification/verify", async (req, res) => {

    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ error: "Authentication required." });
    }

    const { code } = req.body || {};
    if (typeof code !== "string" || !/^\d{6}$/.test(code)) {
        return res.status(400).json({ error: "Enter the six-digit code." });
    }

    try {
        const user = await User.findById(userId).select(
            "+emailVerificationOTPHash " +
            "+emailVerificationExpiresAt " +
            "+emailVerificationAttempts"
        );

        if (!user) {
            return res.status(401).json({ error: "Authentication required." });
        }

        if (user.emailVerified) {
            return res.status(400).json({ error: "Email is already verified." });
        }

        if (!user.emailVerificationOTPHash || !user.emailVerificationExpiresAt) {
            return res.status(400).json({
                error: "Request a verification code first.",
            });
        }

        if (user.emailVerificationExpiresAt.getTime() <= Date.now()) {
            user.emailVerificationOTPHash = undefined;
            user.emailVerificationExpiresAt = undefined;
            user.emailVerificationAttempts = 0;
            await user.save();

            return res.status(400).json({
                error: "The code has expired. Request a new one.",
            });
        }

        if (user.emailVerificationAttempts >= 5) {
            return res.status(429).json({
                error: "Too many incorrect attempts. Request a new code.",
            });
        }

        const submittedHash = Buffer.from(hashOtp(code), "hex");
        const savedHash = Buffer.from(user.emailVerificationOTPHash, "hex");

        const matches =
            submittedHash.length === savedHash.length &&
            timingSafeEqual(submittedHash, savedHash);

        if (!matches) {
            user.emailVerificationAttempts += 1;

            if (user.emailVerificationAttempts >= 5) {
                user.emailVerificationOTPHash = undefined;
                user.emailVerificationExpiresAt = undefined;
            }

            await user.save();
            return res.status(400).json({ error: "Incorrect verification code." });
        }

        user.emailVerified = true;
        user.emailVerificationOTPHash = undefined;
        user.emailVerificationExpiresAt = undefined;
        user.emailVerificationAttempts = 0;
        await user.save();

        return res.status(200).json({
            message: "Email verified successfully.",
            emailVerified: true,
        });
    } catch (error) {
        console.error("Email verification failed:", error.message);
        return res.status(500).json({
            error: "Unable to verify the email code.",
        });
    }
});


router.post("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Logout failed:", error);
            return res.status(500).json({ error: "Unable to logout!" });
        }
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logged out successfully" });
    })
})


module.exports = router;