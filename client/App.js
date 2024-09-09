import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Task from "./screens/Task";
import CatCards from "./screens/CatCards";
import CatDetails from "./screens/CatDetails";

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Tasks" component={Task} />
          <Stack.Screen name="CatCards" component={CatCards} />
          <Stack.Screen name="CatDetails" component={CatDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default App;
