import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { CheckIcon, ActionIcon } from "../styles";
import { updateTaskTextOnServer } from "../api/tasksAPI";

const TaskItem = ({
  task,
  isEditing,
  onToggle,
  onDelete,
  onTaskChange,
  editingTaskId,
  setEditingTaskId,
  onBlur,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        opacity: isEditing && editingTaskId !== task.id ? 0.5 : 1,
      }}
    >
      {isEditing && editingTaskId === task.id ? (
        <TextInput
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: "#ccc",
            padding: 5,
          }}
          value={task.text}
          onChangeText={(text) => onTaskChange(task.id, text)}
          onBlur={() => onBlur(task.id, task.text)}
        />
      ) : (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setEditingTaskId(task.id)}
          disabled={isEditing}
        >
          <Text
            style={{
              textDecorationLine: task.completed ? "line-through" : "none",
            }}
          >
            {task.task}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => onToggle(task.id)} disabled={isEditing}>
        <CheckIcon>{task.completed ? "✓" : "○"}</CheckIcon>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(task.id)} disabled={isEditing}>
        <ActionIcon>🗑️</ActionIcon>
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
