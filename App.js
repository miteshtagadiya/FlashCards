import * as React from "react";
import { Button, Text, View, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";
import Ionicons from "react-native-vector-icons/Ionicons";
import { setLocalNotification } from "./utils/database";

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Decks") {
                iconName = "md-card";
              } else if (route.name === "Add Deck") {
                iconName = "md-add-circle-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "purple",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Decks" component={Decks} />
          <Tab.Screen name="Add Deck" component={AddDeck} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
