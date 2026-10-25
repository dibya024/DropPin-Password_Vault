const express = require("express");
const mongoose = require("mongoose");

const session = require("express-session");
const { MongoStore } = require("connect-mongo");

require("dotenv").config();
const { validateEncryptionKey } = require("./utils/passwordEncryption");

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const cors = require("cors");
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.set("trust proxy", 1);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
  }),
  cookie: {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  },
}))

const passwordRouter = require("./routes/passwordRouter");
const authRouter = require("./routes/authRouter");

app.use("/api/passwords", passwordRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 3000;
async function startServer() {
  try {
    validateEncryptionKey();
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/api/passwords`);
    });
  } catch (err) {
    console.error("Backend startup failed:", err.message);
    process.exit(1);
  }
}

startServer();
