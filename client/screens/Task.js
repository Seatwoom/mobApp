import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FlatList, TouchableOpacity } from "react-native";
import TaskItem from "../components/TaskItem";
import {
  TaskContainer,
  TaskInputContainer,
  InputTask,
  TaskButton,
  ButtonText,
  ViewCatsButton,
  ViewCatsButtonText,
  styles,
} from "../styles";
import { useRootStore } from "../contexts/RootStoreContext";
import { useTheme } from "../contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Task = ({ navigation, route }) => {
  const { taskStore } = useRootStore();
  const { theme, toggleTheme } = useTheme();
  const { userId } = route.params;
  const [taskText, setTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    taskStore.loadTasks(userId);
  }, [userId]);

  const addTask = () => {
    if (taskText.trim()) {
      taskStore.addTask(userId, taskText);
      setTaskText("");
    }
  };

  const toggleTask = (id) => {
    taskStore.toggleTask(id);
  };

  const deleteTask = (id) => {
    taskStore.deleteTask(id);
  };

  const handleBlur = (id, text) => {
    taskStore.updateTaskText(id, text);
    setEditingTaskId(null);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
          <MaterialCommunityIcons
            name={theme === "dark" ? "weather-night" : "white-balance-sunny"}
            size={24}
            color={styles[theme].iconColor}
          />
        </TouchableOpacity>
      ),
    });
  }, [theme, navigation]);

  return (
    <TaskContainer style={styles[theme].container}>
      <FlatList
        data={taskStore.tasks.slice()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={deleteTask}
            isEditing={editingTaskId !== null}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
            onBlur={handleBlur}
            theme={theme}
          />
        )}
      />
      <TaskInputContainer>
        <ViewCatsButton
          style={styles[theme].button}
          onPress={() => navigation.navigate("CatCards", { userId })}
        >
          <ViewCatsButtonText>View Cats</ViewCatsButtonText>
        </ViewCatsButton>
        <InputTask
          style={styles[theme].input}
          value={taskText}
          onChangeText={setTaskText}
          placeholder="Add a task"
          placeholderTextColor={styles[theme].placeholderColor}
        />
        <TaskButton
          style={styles[theme].button}
          onPress={addTask}
          disabled={!taskText.trim()}
        >
          <ButtonText>Add</ButtonText>
        </TaskButton>
      </TaskInputContainer>
    </TaskContainer>
  );
};

export default observer(Task);
