import { types, flow, applySnapshot } from "mobx-state-tree";
import {
  fetchTasks,
  saveTask,
  updateTaskOnServer,
  deleteTaskFromServer,
} from "../api/tasksAPI";

const Task = types.model("Task", {
  id: types.identifierNumber,
  task: types.string,
  completed: types.boolean,
});

const TaskStore = types
  .model("TaskStore", {
    tasks: types.array(Task),
  })
  .actions((self) => ({
    loadTasks: flow(function* (userId) {
      try {
        const tasksFromServer = yield fetchTasks(userId);
        self.tasks.replace(
          tasksFromServer.sort((a, b) => a.completed - b.completed)
        );
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    }),
    addTask: flow(function* (userId, taskText) {
      if (!taskText.trim()) return;

      try {
        const newTask = yield saveTask(userId, taskText);
        self.tasks.push(newTask);
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }),
    toggleTask: flow(function* (id) {
      const task = self.tasks.find((task) => task.id === id);
      if (task) {
        try {
          applySnapshot(task, {
            ...task,
            completed: !task.completed,
          });
          yield updateTaskOnServer(id, { completed: task.completed }, "status");
        } catch (error) {
          console.error("Error updating task status on server:", error);
          applySnapshot(task, {
            ...task,
            completed: !task.completed,
          });
        }
      }
    }),
    deleteTask: flow(function* (id) {
      try {
        yield deleteTaskFromServer(id);
        self.tasks = self.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }),
    updateTaskText: flow(function* (id, newText) {
      const task = self.tasks.find((task) => task.id === id);
      if (task) {
        task.task = newText;
        try {
          yield updateTaskOnServer(id, { taskText: newText }, "text");
        } catch (error) {
          console.error("Failed to update task text:", error);
        }
      }
    }),
  }));

export default TaskStore;
