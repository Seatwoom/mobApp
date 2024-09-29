import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import {
  Container,
  InputAuth,
  Button,
  ButtonText,
  Link,
  styles,
} from "../styles";
import { loginUser } from "../api/authAPI";
import { useTheme } from "../contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { theme, toggleTheme } = useTheme();

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
      Alert.alert("Error", "Invalid username or password");
    }
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
    <Container style={styles[theme].container}>
      <InputAuth
        style={styles[theme].input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor={styles[theme].placeholderColor}
      />
      <InputAuth
        style={styles[theme].input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={styles[theme].placeholderColor}
      />
      <Button style={styles[theme].button} onPress={handleLogin}>
        <ButtonText>Login</ButtonText>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Link style={styles[theme].link}>Don't have an account? Register</Link>
      </TouchableOpacity>
    </Container>
  );
};

export default Login;
