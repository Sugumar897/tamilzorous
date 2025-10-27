const express = require("express");
const router = express.Router();
const pool = require("../db");


router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE role='employee'"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
