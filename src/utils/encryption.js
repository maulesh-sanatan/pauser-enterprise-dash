import CryptoJS from "crypto-js";

const secretKey = "yourSecretKey";

export const encryptData = (data) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();

  const urlSafeBase64 = encrypted
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return urlSafeBase64;
};

export const decryptData = (encryptedData) => {
  const base64 = encryptedData.replace(/-/g, "+").replace(/_/g, "/");

  const bytes = CryptoJS.AES.decrypt(base64, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  return JSON.parse(decryptedData);
};
