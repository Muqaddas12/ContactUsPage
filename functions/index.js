// LINE 1-2: Import Firebase's onRequest function from v2 HTTPS module
// Enables creating HTTP-triggered Cloud Functions
import { onRequest } from "firebase-functions/v2/https";

// LINE 4-5: Import Firebase's logger for Cloud Functions environment
// Provides structured logging in GCP
import * as logger from "firebase-functions/logger";

// LINE 7-8: Import Express framework
// Creates web server and handles HTTP requests
import express from "express";

// LINE 10-11: Import Node's path module
// Handles filesystem path operations
import path from "path";

// LINE 13-14: Import URL conversion utility
// Needed for ES modules path resolution
import { fileURLToPath } from "url";

// LINE 16-17: Import custom mail router
// Contains contact form and email sending logic
import sendMailRouter from "./routes/sendMail.mjs";

// LINE 19-20: Create Express application instance
// Main server object that handles all requests
const app = express();

// LINE 22-23: Get current file's absolute path
// Converts import.meta.url to filesystem path
const __filename = fileURLToPath(import.meta.url);

// LINE 25-26: Get current directory path
// Used for relative path resolution
const __dirname = path.dirname(__filename);

// ========== Express Configuration Section ========== //

// LINE 30-31: Set EJS as view template engine
// Allows rendering dynamic HTML templates
app.set("view engine", "ejs");

// LINE 34-35: Set views directory path
// Where our EJS templates are stored
app.set("views", path.join(__dirname, "views"));

// LINE 38-40: Add URL-encoded body parser middleware
// Handles form submissions (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// LINE 42-43: Add JSON body parser middleware
// Handles API requests (application/json)
app.use(express.json());

// ========== Route Configuration Section ========== //

// LINE 47-48: Mount sendMailRouter at root path
// Delegates all '/' routes to sendMailRouter
app.use('/', sendMailRouter);

// ========== Firebase Deployment Section ========== //

// LINE 52-53: Export as Firebase Cloud Function
// Creates HTTP endpoint for our Express app
export const api = onRequest(app);

// ========== Local Development Section ========== //
/*
// LINE 58-66: Local server setup (commented out)
// Only runs when process.env.LOCAL === 'true'
if (process.env.LOCAL === 'true') {
  // Set port from env or default to 3000
  const PORT = process.env.PORT || 3000;
  
  // Start Express server locally
  app.listen(PORT, () => {
    console.log(`Running locally at http://localhost:${PORT}`);
  });
}
*/