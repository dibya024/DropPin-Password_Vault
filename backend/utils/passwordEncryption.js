const crypto = require("node:crypto");

const ENCRYPTED_PREFIX = "enc:v1:";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

function getEncryptionKey() {
  const encodedKey = process.env.VAULT_ENCRYPTION_KEY;
  if (!encodedKey) {
    throw new Error("VAULT_ENCRYPTION_KEY must be configured");
  }

  const key = Buffer.from(encodedKey, "base64");
  if (key.length !== 32 || key.toString("base64") !== encodedKey) {
    throw new Error("VAULT_ENCRYPTION_KEY must be a base64-encoded 32-byte key");
  }
  return key;
}

function validateEncryptionKey() {
  getEncryptionKey();
}

function isEncrypted(value) {
  return typeof value === "string" && value.startsWith(ENCRYPTED_PREFIX);
}

function encryptPassword(password) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(password, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return `${ENCRYPTED_PREFIX}${iv.toString("base64")}:${authTag.toString("base64")}:${ciphertext.toString("base64")}`;
}

function decryptPassword(encryptedPassword) {
  if (!isEncrypted(encryptedPassword)) {
    throw new Error("Password is not encrypted");
  }

  const [ivEncoded, authTagEncoded, ciphertextEncoded, extra] =
    encryptedPassword.slice(ENCRYPTED_PREFIX.length).split(":");
  const iv = Buffer.from(ivEncoded || "", "base64");
  const authTag = Buffer.from(authTagEncoded || "", "base64");
  const ciphertext = Buffer.from(ciphertextEncoded || "", "base64");

  if (extra !== undefined || iv.length !== IV_LENGTH || authTag.length !== AUTH_TAG_LENGTH) {
    throw new Error("Encrypted password has an invalid format");
  }

  const decipher = crypto.createDecipheriv("aes-256-gcm", getEncryptionKey(), iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]).toString("utf8");
}

module.exports = {
  decryptPassword,
  encryptPassword,
  isEncrypted,
  validateEncryptionKey,
};
