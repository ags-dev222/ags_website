import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the Association of Ghana Startups Website, let get started!");
});

router.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

export default router;  
