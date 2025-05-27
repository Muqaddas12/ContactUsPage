// LINE 1: Import nodemailer package for sending emails from Node.js
import nodemailer from "nodemailer";

// LINE 2: Import Express framework to handle HTTP routes
import express from "express";

// LINES 4-5: (Commented out) Environment variable configuration - not currently active
// import dotenv from "dotenv";
// dotenv.config();

// LINE 8: Create an Express Router instance to define specific routes
const sendMail = express.Router();

// LINES 11-12: (Commented out) Would normally store email credentials in environment variables
// const EMAIL = process.env.EMAIL;
// const PASSWORD = process.env.PASSWORD;

// LINES 15-17: GET route handler for the root path ('/')
sendMail.get("/", (req, res) => {
  // Renders the ContactUs.ejs view template when users visit the contact page
  return res.render('ContactUs');
});

// LINES 20-55: POST route handler for form submissions at '/contactUs'
sendMail.post("/contactUs", async (req, res) => {
  // LINE 21: Destructure form fields from the request body
  const { firstName, lastName, email, phone, message } = req.body;

  // LINES 23-28: Configure nodemailer with Gmail SMTP service
  const transporter = nodemailer.createTransport({
    service: "gmail",  // Specifies we're using Gmail's email service
    auth: {
      user: 'testing111250@gmail.com',  // Sender email address
      pass: 'bymi wlke dubd fbbl',     // App-specific password (should be in env vars)
    },
  });

  // LINES 30-42: Set up email content options
  const mailOptions = {
    from: email,                   // Sets form submitter's email as sender
    to: 'testing111250@gmail.com', // Hardcoded recipient email
    subject: "Socta Page Query",   // Email subject line
    // HTML-formatted email body with contact details
    html: `
      <h3>Contact Details</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  // LINES 44-54: Email sending execution with error handling
  try {
    // LINE 46: Attempt to send the email using configured transporter
    await transporter.sendMail(mailOptions);
    // LINE 48: On success, redirect back to form with success message
    return res.redirect("/?msg=Message sent successfully!");
  } catch (error) {
    // LINE 51: Log full error to server console for debugging
    console.error("Error sending email:", error);
    // LINE 53: On failure, redirect back with error message
    return res.redirect("/?msg=Something went wrong.");
  }
});

// LINE 58: Export the configured router for use in main application
export default sendMail;