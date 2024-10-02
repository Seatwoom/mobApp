import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { CheckIcon, ActionIcon, styles } from "../styles";
import { observer } from "mobx-react-lite";

const TaskItem = ({
  task,
  isEditing,
  onToggle,
  onDelete,
  onTaskChange,
  editingTaskId,
  setEditingTaskId,
  onBlur,
  theme,
}) => {
  const [textInputValue, setTextInputValue] = useState(task.task);

  useEffect(() => {
    if (isEditing && editingTaskId === task.id) {
      setTextInputValue(task.task);
    }
  }, [isEditing, editingTaskId, task.id, task.task]);

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
          value={textInputValue}
          onChangeText={(text) => setTextInputValue(text)}
          onBlur={() => onBlur(task.id, textInputValue)}
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
              color: styles[theme].input.color,
            }}
          >
            {task.task}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => onToggle(task.id)} disabled={isEditing}>
        <CheckIcon
          style={{
            color: styles[theme].input.color,
          }}
        >
          {task.completed ? "✓" : "○"}
        </CheckIcon>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(task.id)} disabled={isEditing}>
        <ActionIcon>🗑️</ActionIcon>
      </TouchableOpacity>
    </View>
  );
};

export default observer(TaskItem);
