import * as React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TextButton from "./Button";
import { saveDeckTitle } from "../utils/database";
import Deck from "./Deck";
import AddCard from "./AddCard";
import Quiz from "./Quiz";

class AddDeckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "stretch", padding: 10 }}>
        <View>
          <Text style={styles.title}>Enter New Deck's Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Title"
            onChangeText={(name) => this.setState({ text: name })}
          />
          <View style={{ padding: 10 }}>
            <TextButton
              style={{ backgroundColor: "purple" }}
              onPress={() => {
                saveDeckTitle(this.state.text);
                this.props.navigation.push("Deck", {
                  id: this.state.text,
                });
                this.setState({
                  text: "",
                });
              }}
            >
              Create Deck
            </TextButton>
          </View>
        </View>
      </View>
    );
  }
}

export default function AddDeck() {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Add Deck" component={AddDeckForm} />
      <HomeStack.Screen
        options={({ route }) => ({ title: route.params.id })}
        name="Deck"
        component={Deck}
      />
      <HomeStack.Screen
        options={({ route }) => ({
          title: route.params.id,
          headerTitleAlign: "center",
        })}
        name="Card"
        component={AddCard}
      />
      <HomeStack.Screen
        options={({ route }) => ({
          title: route.params.id,
          headerTitleAlign: "center",
        })}
        name="Quiz"
        component={Quiz}
      />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    margin: 10,
    fontWeight: "bold",
  },
  textInput: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
