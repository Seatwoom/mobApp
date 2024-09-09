import { API_BASE_URL } from "../config.js";

export const fetchTasks = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const saveTask = async (userId, taskText) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, task: taskText }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from server:", errorText);
      throw new Error("Failed to save task");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to save task:", error);
    throw error;
  }
};

export const updateTaskOnServer = async (taskId, updatedFields, updateType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedFields, updateType }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task on server");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update task on server:", error);
    throw error;
  }
};

export const deleteTaskFromServer = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from server:", errorText);
      throw new Error("Failed to delete task");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
};
