import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";
import { AES, enc } from "crypto-js";

const BASE_URL = process.env.API_URL + `api/`;

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosAuthFile = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

// Decode JWT (tanpa verifikasi)
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// Fungsi aman untuk ambil token
function getDecryptedToken() {
  try {
    if (!hasCookie("test-authorize")) return null;

    const cookie = getCookie("test-authorize")?.toString();
    const secretKey = process.env.SECRET_KEY?.toString();
    if (!cookie || !secretKey) return null;

    const bytes = AES.decrypt(cookie, secretKey);
    const decrypted = bytes.toString(enc.Utf8);

    if (!decrypted) return null; 

    const parsed = JSON.parse(decrypted);
    return parsed?.token || null;
  } catch {
    return null;
  }
}

// Pasang interceptor untuk axiosAuth
axiosAuth.interceptors.request.use(
  (config) => {
    const token = getDecryptedToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      const payload = parseJwt(token);
      if (payload?.role) {
        config.headers["X-User-Role"] = payload.role;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Untuk axiosAuthFile
axiosAuthFile.interceptors.request.use(
  (config) => {
    const token = getDecryptedToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      const payload = parseJwt(token);
      if (payload?.role) {
        config.headers["X-User-Role"] = payload.role;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
