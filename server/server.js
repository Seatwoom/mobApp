require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");
const catController = require("./controllers/catController");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post("/register", userController.registerUser);
app.post("/login", userController.loginUser);

app.get("/tasks/:userId", taskController.getTasks);
app.post("/tasks", taskController.addTask);
app.patch("/tasks/:taskId", taskController.updateTask);
app.delete("/tasks/:taskId", taskController.deleteTask);
app.get("/cats/:userId", catController.getCatsByUserId);
app.post("/cats", catController.saveCats);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
