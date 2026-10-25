const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        site: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        collection: "documents",
        timestamps: true,
    }
);


module.exports = mongoose.model("Document", documentSchema);