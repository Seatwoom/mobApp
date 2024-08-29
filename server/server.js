const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pool } = require("./config/db");
const bcrypt = require("bcrypt");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const saltRounds = 10;
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userCheck = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [username, hashedPassword]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT id, password FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "User does not exist" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.status(200).json({ userId: user.id });
    } else {
      res.status(401).json({ error: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/tasks", async (req, res) => {
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
});

app.post("/tasks", async (req, res) => {
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
});

app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY "order" ASC',
      [id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { completed, order, taskText, updateType } = req.body;

  try {
    if (updateType === "status") {
      const result = await pool.query(
        'UPDATE tasks SET completed = $1, "order" = $2 WHERE id = $3 RETURNING *',
        [completed, order, id]
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
        await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
        res.status(200).json({ message: "Task deleted successfully" });
      } else {
        const result = await pool.query(
          "UPDATE tasks SET task = $1 WHERE id = $2 RETURNING *",
          [taskText, id]
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
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/cats/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM cats WHERE user_id = $1", [
      userId,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0].cat_data);
    } else {
      res.status(404).json({ error: "No cats found for this user" });
    }
  } catch (err) {
    console.error("Error fetching cats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/cats", async (req, res) => {
  const { userId, catData } = req.body;
  try {
    const existingCat = await pool.query(
      "SELECT * FROM cats WHERE user_id = $1",
      [userId]
    );

    let result;

    if (existingCat.rows.length > 0) {
      result = await pool.query(
        "UPDATE cats SET cat_data = $2 WHERE user_id = $1 RETURNING *",
        [userId, JSON.stringify(catData)]
      );
    } else {
      result = await pool.query(
        "INSERT INTO cats (user_id, cat_data) VALUES ($1, $2) RETURNING *",
        [userId, JSON.stringify(catData)]
      );
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error saving cats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
