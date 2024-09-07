const pool = require("../config/db");
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.registerUser = async (req, res) => {
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
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT id, password FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid usename or password" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      result.rows[0].password
    );

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid usename or password" });
    }

    res.json({ userId: result.rows[0].id });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
