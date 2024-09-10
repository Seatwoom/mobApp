import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import TaskItem from "../components/TaskItem";
import {
  TaskContainer,
  TaskInputContainer,
  InputTask,
  TaskButton,
  ButtonText,
  ViewCatsButton,
  ViewCatsButtonText,
  lightStyles,
  darkStyles,
} from "../styles";
import {
  fetchTasks,
  saveTask,
  updateTaskOnServer,
  deleteTaskFromServer,
} from "../api/tasksAPI";
import { useTheme } from "../contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Task = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const { userId } = route.params;

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksFromServer = await fetchTasks(userId);
        tasksFromServer.sort((a, b) => a.completed - b.completed);
        setTasks(tasksFromServer);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };
    loadTasks();
  }, [userId]);

  const addTask = async () => {
    if (!taskText.trim()) return;

    try {
      const newTask = await saveTask(userId, taskText);
      const updatedTasks = [...tasks, newTask];
      updatedTasks.sort((a, b) => a.completed - b.completed);
      setTasks(updatedTasks);
      setTaskText("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const toggleTask = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    updatedTasks.sort((a, b) => a.completed - b.completed);
    setTasks(updatedTasks);
    const updatedTask = updatedTasks.find((task) => task.id === id);
    try {
      await updateTaskOnServer(
        id,
        { completed: updatedTask.completed },
        "status"
      );
    } catch (error) {
      console.error("Error updating task status on server:", error);
      setTasks(tasks);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskFromServer(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleTaskChange = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const updateTaskLocally = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, task: newText } : task))
    );
  };

  const handleBlur = async (id, text) => {
    try {
      const taskText = text || "";
      const response = await updateTaskOnServer(id, { taskText }, "text");

      if (response.message === "Task deleted successfully") {
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        updateTaskLocally(id, taskText);
      }
    } catch (error) {
      console.error("Failed to save edited task:", error);
    } finally {
      setEditingTaskId(null);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
          <MaterialCommunityIcons
            name={isDarkMode ? "weather-night" : "white-balance-sunny"}
            size={24}
            color={isDarkMode ? "#FFFFFF" : "#000000"}
          />
        </TouchableOpacity>
      ),
    });
  }, [isDarkMode, navigation]);
  return (
    <TaskContainer
      style={isDarkMode ? darkStyles.container : lightStyles.container}
    >
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={deleteTask}
            isEditing={editingTaskId !== null}
            onTaskPress={setEditingTaskId}
            onTaskChange={handleTaskChange}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
            updateTaskLocally={updateTaskLocally}
            onBlur={handleBlur}
            isDarkMode={isDarkMode}
          />
        )}
      />
      <TaskInputContainer>
        <ViewCatsButton
          style={isDarkMode ? darkStyles.button : lightStyles.button}
          onPress={() => navigation.navigate("CatCards", { userId })}
        >
          <ViewCatsButtonText>View Cats</ViewCatsButtonText>
        </ViewCatsButton>
        <InputTask
          style={isDarkMode ? darkStyles.input : lightStyles.input}
          value={taskText}
          onChangeText={setTaskText}
          placeholder="Add a task"
          placeholderTextColor={isDarkMode ? "#fff" : "#000"}
          editable={editingTaskId === null}
        />
        <TaskButton
          style={isDarkMode ? darkStyles.button : lightStyles.button}
          onPress={addTask}
          disabled={editingTaskId !== null || !taskText.trim()}
        >
          <ButtonText>Add</ButtonText>
        </TaskButton>
      </TaskInputContainer>
    </TaskContainer>
  );
};

export default Task;
