import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import {
  Container,
  InputAuth,
  Button,
  ButtonText,
  Link,
  lightStyles,
  darkStyles,
} from "../styles";
import { registerUser } from "../api/authAPI";
import { useTheme } from "../contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();
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
    <Container
      style={isDarkMode ? darkStyles.container : lightStyles.container}
    >
      <InputAuth
        style={isDarkMode ? darkStyles.input : lightStyles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor={isDarkMode ? "#fff" : "#000"}
      />
      <InputAuth
        style={isDarkMode ? darkStyles.input : lightStyles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={isDarkMode ? "#fff" : "#000"}
      />
      <Button
        style={isDarkMode ? darkStyles.button : lightStyles.button}
        onPress={handleRegister}
      >
        <ButtonText>Register</ButtonText>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Link style={isDarkMode ? darkStyles.link : lightStyles.link}>
          Already have an account? Login
        </Link>
      </TouchableOpacity>
    </Container>
  );
};

export default Register;
