import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Task from "./screens/Task";
import CatCards from "./screens/CatCards";
import CatDetails from "./screens/CatDetails";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { styles } from "./styles";
import { RootStoreProvider } from "./stores/RootStore";
const Stack = createStackNavigator();

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <View style={styles[theme].container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: styles[theme].header.backgroundColor,
            },
            headerTintColor: styles[theme].header.tintColor,
          }}
        >
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

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
