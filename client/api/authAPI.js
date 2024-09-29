import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config.js";

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Invalid login");
  }

  const data = await response.json();
  if (data.token) {
    await storeToken(data.token);
  }
  return data;
};

export const registerUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Registration failed");
  }

  return await response.json();
};
