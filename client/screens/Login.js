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
import { loginUser } from "../api/authAPI";
import { useTheme } from "../contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();
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
        onPress={handleLogin}
      >
        <ButtonText>Login</ButtonText>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Link style={isDarkMode ? darkStyles.link : lightStyles.link}>
          Don't have an account? Register
        </Link>
      </TouchableOpacity>
    </Container>
  );
};

export default Login;
