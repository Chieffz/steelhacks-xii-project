import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from "./firebase-config.json";

const app = initializeApp(config);

// ✅ EXPORT auth
export const auth = getAuth(app);