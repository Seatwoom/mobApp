const pool = require("../config/db");

exports.getTasks = async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addTask = async (req, res) => {
  const userId = req.user.userId;
  const { task } = req.body;

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
  const { taskId } = req.params;
  const { taskText, completed, updateType } = req.body;

  try {
    if (updateType === "status") {
      const result = await pool.query(
        "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *",
        [completed, taskId]
      );
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } else if (updateType === "text") {
      if (taskText === undefined || taskText === null) {
        res.status(400).json({ error: "Task text is required" });
        return;
      }

      if (!taskText.trim()) {
        await pool.query("DELETE FROM tasks WHERE id = $1", [taskId]);
        res.status(200).json({ message: "Task deleted successfully" });
      } else {
        const result = await pool.query(
          "UPDATE tasks SET task = $1 WHERE id = $2 RETURNING *",
          [taskText, taskId]
        );
        if (result.rows.length > 0) {
          res.status(200).json(result.rows[0]);
        } else {
          res.status(404).json({ error: "Task not found" });
        }
      }
    } else {
      res.status(400).json({ error: "Invalid update type" });
    }
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [taskId]);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
