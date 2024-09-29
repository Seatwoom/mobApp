require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");
const catController = require("./controllers/catController");
const authenticateToken = require("./middleware/authMiddleware");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post("/register", userController.registerUser);
app.post("/login", userController.loginUser);

app.get("/tasks/", authenticateToken, taskController.getTasks);
app.post("/tasks", authenticateToken, taskController.addTask);
app.patch("/tasks/:taskId", authenticateToken, taskController.updateTask);
app.delete("/tasks/:taskId", authenticateToken, taskController.deleteTask);
app.get("/cats/", authenticateToken, catController.getCatsByUserId);
app.post("/cats", authenticateToken, catController.saveCats);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
