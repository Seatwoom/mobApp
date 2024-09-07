import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, InputAuth, Button, ButtonText, Link } from "../styles";
import { loginUser } from "../api/authAPI";
const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      const data = await loginUser(username, password);
      if (data.userId) {
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Tasks", { userId: data.userId });
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Invalid usename or password");
    }
  };

  return (
    <Container>
      <InputAuth
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="#000"
      />
      <InputAuth
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#000"
      />
      <Button onPress={handleLogin}>
        <ButtonText>Login</ButtonText>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Link>Don't have an account? Register</Link>
      </TouchableOpacity>
    </Container>
  );
};

export default Login;
