import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, FlatList, Text } from "react-native";
import {
  fetchRandomCats,
  fetchMoreCats,
  saveCatsToServer,
} from "../api/catAPI";
import { API_BASE_URL } from "../config";
import {
  RandomButton,
  RandomButtonText,
  MoreCatsButton,
  MoreCatsButtonText,
  lightStyles,
  darkStyles,
} from "../styles";
import { useTheme } from "../contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CatCards = ({ navigation, route }) => {
  const { userId } = route.params;
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  useEffect(() => {
    fetchCats();
  }, [userId]);

  useEffect(() => {
    fetchCats();
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

  const fetchCats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cats/${userId}`);
      const data = await response.json();
      console.log("Fetched data:", data);
      setCats(Array.isArray(data) ? data : data.cat_data || []);
    } catch (error) {
      console.error("Error fetching cats:", error);
    }
  };

  const handleFetchRandomCats = async () => {
    try {
      const catData = await fetchRandomCats();
      setCats(catData);
      await saveCatsToServer(userId, catData);
    } catch (error) {
      console.error("Error fetching random cats:", error);
    }
  };

  const handleLoadMoreCats = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newCats = await fetchMoreCats(page);
      setCats((prevCats) => [...prevCats, ...newCats]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching more cats:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewCatDetails = (cat) => {
    navigation.navigate("CatDetails", { id: cat.id });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => viewCatDetails(item)}
      style={{
        width: "48%",
        marginBottom: 16,
        marginHorizontal: 4,
      }}
    >
      <Image
        source={{ uri: item.url }}
        style={{ width: "100%", height: 150, borderRadius: 8 }}
      />
    </TouchableOpacity>
  );

  return (
    <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
      <FlatList
        data={cats}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
        contentContainerStyle={{
          justifyContent: "space-between",
        }}
      />
      <RandomButton
        style={isDarkMode ? darkStyles.button : lightStyles.button}
        onPress={handleFetchRandomCats}
      >
        <RandomButtonText>Random</RandomButtonText>
      </RandomButton>
      <RandomButton
        style={isDarkMode ? darkStyles.button : lightStyles.button}
        onPress={handleLoadMoreCats}
        disabled={loading}
      >
        <RandomButtonText>
          {loading ? "Loading..." : "More Cats"}
        </RandomButtonText>
      </RandomButton>
    </View>
  );
};

export default CatCards;
