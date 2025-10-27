const express = require("express");
const router = express.Router();
const pool = require("../db");


router.get("/", async (req, res) => {
  const { assigned_to } = req.query;
  try {
    let query = "SELECT * FROM tasks WHERE isactive = true";
    const params = [];

    if (assigned_to) {
      query += " AND assigned_to = $1";
      params.push(assigned_to);
    }

    query += " ORDER BY created_at DESC";
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/", async (req, res) => {
  const { title, description, assigned_to, status, priority } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, assigned_to, status, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, assigned_to, status || "Assigned", priority || "Medium"]
    );
    res.status(201).json({ success: true, task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, assigned_to, status, priority } = req.body;

  try {
  
    const existingTask = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);
    if (existingTask.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    const task = existingTask.rows[0];

    if (assigned_to && assigned_to !== task.assigned_to) {
      return res.status(403).json({ success: false, message: "You cannot update tasks not assigned to you" });
    }

    const fields = [];
    const values = [];
    let idx = 1;

    if (title !== undefined) { fields.push(`title=$${idx++}`); values.push(title); }
    if (description !== undefined) { fields.push(`description=$${idx++}`); values.push(description); }
    if (status !== undefined) { fields.push(`status=$${idx++}`); values.push(status); }
    if (priority !== undefined) { fields.push(`priority=$${idx++}`); values.push(priority); }

    if (fields.length === 0) {
      return res.status(400).json({ success: false, message: "No fields to update" });
    }

    values.push(id);
    const query = `UPDATE tasks SET ${fields.join(", ")} WHERE id=$${idx} RETURNING *`;
    const result = await pool.query(query, values);

    res.json({ success: true, task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("UPDATE tasks SET isactive = false WHERE id=$1", [id]);
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
