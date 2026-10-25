const express = require("express");
const mongoose = require("mongoose");
const Document = require("../models/Document");
const {
  decryptPassword,
  encryptPassword,
  isEncrypted,
} = require("../utils/passwordEncryption");

const router = express.Router();

router.use((req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Authentication Required!" });
  }
  next();
});

// GET: Fetch all passwords
router.get("/", async (req, res) => {
  try {
    const passwords = await Document.find({ userId: req.session.userId }).sort({ createdAt: -1 });
    const responsePasswords = await Promise.all(
      passwords.map(async (document) => {
        const plaintextPassword = isEncrypted(document.password)
          ? decryptPassword(document.password)
          : document.password;

        if (!isEncrypted(document.password)) {
          document.password = encryptPassword(plaintextPassword);
          await document.save();
        }

        return {
          ...document.toObject(),
          password: plaintextPassword,
        };
      }),
    );
    res.status(200).json(responsePasswords);
  } catch (err) {
    console.error("Error fetching passwords:", err.message);
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});

// POST: Save a new password
router.post("/", async (req, res) => {
  try {
    const { site, username, password } = req.body;

    if (
      typeof site !== "string" || !site.trim() ||
      typeof username !== "string" || !username.trim() ||
      typeof password !== "string" || !password
    ) {
      return res.status(400).json({
        error: "Site, username, and password are required",
      });
    }

    const newPassword = await Document.create({
      site: site.trim(),
      username: username.trim(),
      password: encryptPassword(password),
      userId: req.session.userId,
    });

    res.status(201).json({
      message: "Password saved successfully",
      password: {
        ...newPassword.toObject(),
        password,
      },
    });
  } catch (err) {
    console.error("Error saving password:", err.message);
    res.status(500).json({ error: "Failed to save password" });
  }
});

// DELETE: Delete a password by its MongoDB ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid password ID" });
    }

    const deletedPassword = await Document.findOneAndDelete({
      _id: id,
      userId: req.session.userId,
    });

    if (!deletedPassword) {
      return res.status(404).json({ error: "Password not found" });
    }

    res.status(200).json({
      message: "Password deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting password:", err.message);
    res.status(500).json({ error: "Failed to delete password" });
  }
});

//Edit
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { site, username, password } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid Password ID" });
    }
    if (typeof site !== "string" || !site.trim() ||
      typeof username !== "string" || !username.trim() ||
      typeof password !== "string" || !password) {
      return res.status(400).json({
        error: "site, username, and password are required!"
      });
    }

    const updatedPassword = await Document.findOneAndUpdate(
      { _id: id, userId: req.session.userId },
      {
        site: site.trim(),
        username: username.trim(),
        password: encryptPassword(password),
      },
      { new: true, runValidators: true }
    );
    if (!updatedPassword) {
      return res.status(404).json({ error: "Password not found!" });
    }
    res.status(200).json({
      message: "Password updated successfuly"
    });
  }
  catch (err) {
    console.error("Error in editing password:", err.message);
    res.status(500).json({ error: "Failed to update password" });
  }
});

module.exports = router;