const express = require('express');
const router = express.Router();

// Root path response
router.get("/", (req, res) => {
  res.status(200).send("Welcome to the Association of Ghana Startups Website, let get started!");
});

router.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

module.exports = router;