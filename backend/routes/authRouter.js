const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    if (typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
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
            hashedPassword,
        });
        return res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
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


router.post("/login", async (req, res, next) => {
    const { email, password } = req.body || {};

    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({ error: "Enter a valid email and your password!" })
    }
    try {
        const user = await User.findOne({
            email: email.trim().toLowerCase()
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
        const user = await User.findById(userId).select("_id email");

        if (!user) {
            return res.status(401).json({ error: "Authentication Required!" });

        }
        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (error) {
        console.log("Session verification failed: ", error);
        return res.status(500).json({ error: "Unable to check session!" });
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