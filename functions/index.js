import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";  // Changed import syntax
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
// import dotenv from "dotenv";
import sendMailRouter from "./routes/sendMail.mjs";

// dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', sendMailRouter);

// Firebase Function
export const api = onRequest(app);

// // Local development
// if (process.env.LOCAL === 'true') {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`Running locally at http://localhost:${PORT}`);  // Using console.log instead
//   });
// }