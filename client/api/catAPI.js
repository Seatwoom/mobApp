import axios from "axios";
import { CAT_URL, API_BASE_URL } from "../../config";

export const fetchRandomCats = async () => {
  try {
    const response = await axios.get(
      `${CAT_URL}images/search?limit=6&has_breeds=1`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching random cats:", error);
    throw error;
  }
};

export const fetchMoreCats = async (page) => {
  try {
    const response = await axios.get(
      `${CAT_URL}images/search?limit=10&page=${page}&has_breeds=1`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching more cats:", error);
    throw error;
  }
};

export const saveCatsToServer = async (userId, catData) => {
  try {
    await fetch(`${API_BASE_URL}/cats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, catData }),
    });
  } catch (error) {
    console.error("Error saving cats to server:", error);
    throw error;
  }
};

export const fetchCatDetails = async (id) => {
  try {
    const response = await fetch(`${CAT_URL}images/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching cat details:", error);
    throw error;
  }
};
