import express from 'express';
import otpRoutes from "./otp.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the Association of Ghana Startups Website, let get started!");
});

app.use("/api/otp", otpRoutes);

router.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

export default router;  