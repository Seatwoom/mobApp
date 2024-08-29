import React, { useState } from "react";
import { TextInput, Button, View, Text, TouchableOpacity } from "react-native";
import { Input, Button as StyledButton } from "../styles";

const TaskInput = ({ onAddTask }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      onAddTask(text);
      setText("");
    }
  };

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
    >
      <TextInput
        style={Input}
        value={text}
        onChangeText={setText}
        placeholder="Enter task"
      />
      <TouchableOpacity style={StyledButton} onPress={handleAdd}>
        <Text style={{ color: "white" }}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskInput;
