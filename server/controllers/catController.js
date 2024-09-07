const pool = require("../config/db");
exports.getCatsByUserId = async (req, res) => {
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
};
exports.saveCats = async (req, res) => {
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
};
