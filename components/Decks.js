import * as React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AddCard from "./AddCard";
import Deck from "./Deck";
import { getDecks } from "../utils/database";
import Quiz from "./Quiz";
import DeckCard from "./DeckCard";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: {},
    };
  }

  ajax$ = [];

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.ajax$.push(
      getDecks().then((item) =>
        this.setState({
          cards: item,
        })
      )
    );
  };

  componentDidUpdate(_prevProps) {
    this.getData();
  }

  componentWillUnmount() {
    this.ajax$.map((a) => a.unsubscribe());
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.center}>
          {Object.values(this.state.cards).length === 0 && (
            <View style={styles.noData}>
              <Text style={styles.noDataText}>
                No Decks Found at the moment
              </Text>
            </View>
          )}
          {Object.values(this.state.cards).map((data, index) => {
            return (
              <DeckCard
                key={index}
                onPress={() =>
                  this.props.navigation.push("Deck", {
                    id: data.title,
                  })
                }
                title={data.title}
                value={data.questions.length}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default function Decks() {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Decks" component={HomeScreen} />
      <HomeStack.Screen
        options={({ route }) => ({
          title: route.params.id,
          headerTitleAlign: "center",
        })}
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
  noData: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  noDataText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  center: {
    alignItems: "center",
    alignItems: "stretch",
    padding: 10,
    flexGrow: 1,
  },
});
