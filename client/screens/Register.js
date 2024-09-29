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
import { registerUser } from "../api/authAPI";
import { useTheme } from "../contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { theme, toggleTheme } = useTheme();
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
      <Button style={styles[theme].button} onPress={handleRegister}>
        <ButtonText>Register</ButtonText>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Link style={styles[theme].link}>Already have an account? Login</Link>
      </TouchableOpacity>
    </Container>
  );
};

export default Register;
