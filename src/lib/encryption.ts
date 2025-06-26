import * as crypto from "crypto";

const secret = process.env.AUTH_SECRET;
if (!secret) {
  throw new Error(
    "AUTH_SECRET environment variable is not set. It is required for encryption/decryption."
  );
}

const algorithm = "aes-256-cbc";
const encryptionKey = crypto.createHash("sha256").update(secret).digest();

/**
 * Encrypts a JavaScript object into a base64 encoded string using AES-256-CBC.
 * The IV (Initialization Vector) is prepended to the ciphertext.
 *
 * @param payload The object to encrypt.
 * @returns A promise that resolves to the encrypted string (IV + ciphertext, base64 encoded).
 */
export async function encrypt(payload: Record<string, any>): Promise<string> {
  try {
    const iv = crypto.randomBytes(16); // Generate a random 16-byte IV for AES-256-CBC
    const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);

    let encrypted = cipher.update(JSON.stringify(payload), "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt data.");
  }
}

/**
 * Decrypts a base64 encoded string (containing IV and ciphertext) back into a JavaScript object.
 *
 * @param encryptedString The encrypted string (IV + ciphertext, base64 encoded).
 * @returns A promise that resolves to the decrypted payload.
 */
export async function decrypt<T>(encryptedString: string): Promise<T> {
  try {
    const parts = encryptedString.split(":");
    if (parts.length !== 2) {
      throw new Error("Invalid encrypted string format.");
    }

    const iv = Buffer.from(parts[0], "hex");
    const encryptedText = parts[1];

    if (iv.length !== 16) {
      throw new Error("Invalid IV length.");
    }

    const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted) as T;
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error(
      "Failed to decrypt data. Check AUTH_SECRET and encrypted string format."
    );
  }
}
