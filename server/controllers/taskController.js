const { pool } = require("../config/db");

exports.getTasks = async (req, res) => {
  const { userId } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY "order" ASC',
      [userId]
    );
    res.json({ tasks: result.rows });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addTask = async (req, res) => {
  const { userId, task } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tasks (user_id, task) VALUES ($1, $2) RETURNING *",
      [userId, task]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed, order, taskText, updateType } = req.body;

  try {
    if (updateType === "status") {
      const result = await pool.query(
        'UPDATE tasks SET completed = $1, "order" = $2 WHERE id = $3 RETURNING *',
        [completed, order, id]
      );
      res.json(result.rows[0]);
    } else if (updateType === "text") {
      const result = await pool.query(
        "UPDATE tasks SET task = $1 WHERE id = $2 RETURNING *",
        [taskText, id]
      );
      res.json(result.rows[0]);
    } else {
      res.status(400).json({ error: "Invalid update type" });
    }
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
