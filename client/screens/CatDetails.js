import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { fetchCatDetails } from "../api/catAPI";
import {
  CatContainer,
  CatImage,
  CatBreedName,
  CatDescription,
  CatDetail,
  CatDetailText,
  CatDetailLabel,
  NoInfoText,
  LinkText,
  styles,
} from "../styles.js";
import { TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const CatDetailed = ({ navigation }) => {
  const route = useRoute();
  const { id } = route.params;
  const [cat, setCat] = useState(null);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const loadCatDetails = async () => {
      try {
        const data = await fetchCatDetails(id);
        console.log("Cat data:", data);
        setCat(data);
      } catch (error) {
        console.error("Error fetching cat details:", error);
      }
    };

    loadCatDetails();
  }, [id]);
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

  if (!cat) return <NoInfoText>Loading...</NoInfoText>;

  const breed = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : null;

  return (
    <CatContainer style={styles[theme].container}>
      <CatImage source={{ uri: cat.url }} />
      <CatDetail>
        <CatBreedName style={styles[theme].text}>
          {breed?.name || "Unknown Breed"}
        </CatBreedName>
        {breed ? (
          <>
            <CatDescription style={styles[theme].text}>
              {breed.description || "No description available."}
            </CatDescription>
            <CatDetailText style={styles[theme].text}>
              <CatDetailLabel style={styles[theme].text}>
                Temperament:
              </CatDetailLabel>{" "}
              {breed.temperament || "Not available"}
            </CatDetailText>
            <CatDetailText>
              <CatDetailLabel style={styles[theme].text}>
                Origin:
              </CatDetailLabel>{" "}
              {breed.origin || "Not available"}
            </CatDetailText>
            <CatDetailText style={styles[theme].text}>
              <CatDetailLabel>Life Span:</CatDetailLabel>{" "}
              {breed.life_span || "Not available"} years
            </CatDetailText>
            <CatDetailText style={styles[theme].text}>
              <CatDetailLabel>Wikipedia:</CatDetailLabel>{" "}
              <LinkText>{breed.wikipedia_url || "Not available"}</LinkText>
            </CatDetailText>
          </>
        ) : (
          <NoInfoText>No breed information available.</NoInfoText>
        )}
      </CatDetail>
    </CatContainer>
  );
};
export default CatDetailed;
