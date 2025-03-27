import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Set up Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL, // ✅ Uses Environment Variables
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * ✅ Sends a One-Time Password (OTP) via email
 * @param {string} userEmail - Recipient Email
 * @param {string} otp - Generated OTP Code
 */
export const sendOTPEmail = async (userEmail, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent successfully to ${userEmail}`);
  } catch (error) {
    console.error(`❌ Error sending OTP email: ${error.message}`);
  }
};

/**
 * ✅ Sends a Password Reset Email with a Secure Reset Link
 * @param {string} userEmail - Recipient Email
 * @param {string} resetToken - Secure Reset Token
 */
export const sendPasswordResetEmail = async (userEmail, resetToken) => {
  const resetLink = `https://yourfrontend.com/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nThis link expires in 15 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${userEmail}`);
  } catch (error) {
    console.error(`❌ Error sending password reset email: ${error.message}`);
  }
};

/**
 * ✅ Sends RSVP Confirmation Email
 * @param {string} userEmail - Recipient Email
 * @param {Object} event - Event Details
 */
export const sendRSVPEmail = async (userEmail, event) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `RSVP Confirmation for ${event.title}`,
    text: `You have successfully RSVPed for the event: ${event.title} on ${event.date}. Location: ${event.location}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ RSVP Confirmation Email Sent to ${userEmail}`);
  } catch (error) {
    console.error(`❌ Error sending RSVP email: ${error.message}`);
  }
};

/**
 * ✅ Sends a General Email Notification
 * @param {string} to - Recipient Email
 * @param {string} subject - Email Subject
 * @param {string} text - Email Body
 */
export const sendEmailNotification = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`❌ Error sending email: ${error.message}`);
  }
};

/**
 * ✅ Sends a Notification for a New Blog Post
 * @param {string} userEmail - Recipient Email
 * @param {Object} blogPost - Blog Post Details
 */
export const sendBlogPostNotification = async (userEmail, blogPost) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `New Blog Post: ${blogPost.title}`,
    text: `Check out the new blog post titled: ${blogPost.title}.\n\n${blogPost.summary}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Blog Post Notification Sent to ${userEmail}`);
  } catch (error) {
    console.error(`❌ Error sending blog post notification: ${error.message}`);
  }
};

/**
 * ✅ Sends a Notification for a New Event Post
 * @param {string} userEmail - Recipient Email
 * @param {Object} eventPost - Event Details
 */
export const sendEventPostNotification = async (userEmail, eventPost) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `New Event: ${eventPost.title}`,
    text: `Check out the upcoming event: ${eventPost.title}.\n\n${eventPost.description}\n\nEvent Date: ${eventPost.date}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Event Post Notification Sent to ${userEmail}`);
  } catch (error) {
    console.error(`❌ Error sending event post notification: ${error.message}`);
  }
};

/**
 * ✅ Sends a Notification for a New Resource Post
 * @param {string} userEmail - Recipient Email
 * @param {Object} resourcePost - Resource Details
 */
export const sendResourcePostNotification = async (userEmail, resourcePost) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `New Resource: ${resourcePost.title}`,
    text: `Check out the new resource: ${resourcePost.title}.\n\n${resourcePost.summary}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Resource Post Notification Sent to ${userEmail}`);
  } catch (error) {
    console.error(`❌ Error sending resource post notification: ${error.message}`);
  }
};
