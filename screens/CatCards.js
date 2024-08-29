import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, ScrollView, Text } from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { RandomButton, RandomButtonText } from "../styles";
const CatCards = ({ navigation, route }) => {
  const { userId } = route.params;
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cats/${userId}`);
        const data = await response.json();
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setCats(data);
        } else if (data.cat_data && Array.isArray(data.cat_data)) {
          setCats(data.cat_data);
        } else {
          setCats([]);
        }
      } catch (error) {
        console.error("Error fetching cats:", error);
      }
    };

    fetchCats();
  }, [userId]);

  const fetchRandomCats = async () => {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=6&has_breeds=1`
      );
      const catData = response.data;
      setCats(catData);
      await fetch(`${API_BASE_URL}/cats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, catData }),
      });
    } catch (error) {
      console.error("Error fetching random cats:", error);
    }
  };

  const viewCatDetails = (cat) => {
    navigation.navigate("CatDetails", { id: cat.id });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {cats.map((cat, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => viewCatDetails(cat)}
            style={{ width: "48%", marginBottom: 16 }}
          >
            <Image
              source={{ uri: cat.url }}
              style={{ width: "100%", height: 150, borderRadius: 8 }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <RandomButton onPress={fetchRandomCats}>
        <RandomButtonText>Random</RandomButtonText>
      </RandomButton>
    </ScrollView>
  );
};

export default CatCards;
