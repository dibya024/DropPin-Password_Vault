const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        hashedPassword: {
            type: String,
            required: true,
            select: false,
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationOTPHash: {
            type: String,
            select:false,
        },
        emailVerificationExpiresAt: {
            type: Date,
            select:false,
        },
        emailVerificationAttempts: {
            type: Number,
            default: 0,
            select:false,
        },
        emailVerificationLastSentAt: {
            type: Date,
            select:false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);