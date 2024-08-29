import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
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
} from "../styles.js";
const CatDetailed = () => {
  const route = useRoute();
  const { id } = route.params;
  const [cat, setCat] = useState(null);

  useEffect(() => {
    const fetchCatDetails = async () => {
      try {
        const response = await fetch(
          `https://api.thecatapi.com/v1/images/${id}`
        );
        const data = await response.json();
        console.log("Cat data:", data);
        setCat(data);
      } catch (error) {
        console.error("Error fetching cat details:", error);
      }
    };

    fetchCatDetails();
  }, [id]);
  if (!cat) return <NoInfoText>Loading...</NoInfoText>;
  const breed = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : null;

  return (
    <CatContainer>
      <CatImage source={{ uri: cat.url }} />
      <CatDetail>
        <CatBreedName>{breed?.name || "Unknown Breed"}</CatBreedName>
        {breed ? (
          <>
            <CatDescription>
              {breed.description || "No description available."}
            </CatDescription>
            <CatDetailText>
              <CatDetailLabel>Temperament:</CatDetailLabel>{" "}
              {breed.temperament || "Not available"}
            </CatDetailText>
            <CatDetailText>
              <CatDetailLabel>Origin:</CatDetailLabel>{" "}
              {breed.origin || "Not available"}
            </CatDetailText>
            <CatDetailText>
              <CatDetailLabel>Life Span:</CatDetailLabel>{" "}
              {breed.life_span || "Not available"} years
            </CatDetailText>
            <CatDetailText>
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
