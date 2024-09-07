import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, InputAuth, Button, ButtonText, Link } from "../styles";
import { registerUser } from "../api/authAPI";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      const data = await registerUser(username, password);
      if (data.id) {
        Alert.alert("Success", "Registration successful!");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", error.message);
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
      <Button onPress={handleRegister}>
        <ButtonText>Register</ButtonText>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Link>Already have an account? Login</Link>
      </TouchableOpacity>
    </Container>
  );
};

export default Register;
