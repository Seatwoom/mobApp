const { pool } = require("../config/db");

exports.getCats = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM cats WHERE user_id = $1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching cats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addCats = async (req, res) => {
  const { userId, catData } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO cats (user_id, cat_data) VALUES ($1, $2) RETURNING *",
      [userId, catData]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding cats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
