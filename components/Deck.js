import * as React from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import TextButton from "./Button";
import { getDecks } from "../utils/database";
import { deleteDeck } from "../utils/database";
import DeckCard from "./DeckCard";

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: {},
      fadeValue: new Animated.Value(0),
    };
  }

  ajax$ = [];

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.getData();
    });
    this._start();
    this.getData();
  }

  _start = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  componentDidUpdate(_prevProps) {
    this.getData();
  }

  getData() {
    this.ajax$.push(
      getDecks().then((item) =>
        this.setState({
          cards: item,
        })
      )
    );
  }

  componentWillUnmount() {
    this.ajax$.map((a) => a.unsubscribe());
  }

  render() {
    const { id } = this.props.route.params;
    return (
      <Animated.View
        style={{
          opacity: this.state.fadeValue,
          flex: 1,
          justifyContent: "space-around",
          alignItems: "stretch",
          padding: 15,
        }}
      >
        {Object.values(this.state.cards)
          .filter((card) => card.title === id)
          .map((card, index) => {
            return (
              <DeckCard
                key={index}
                onPress={() => {}}
                title={card.title}
                value={card.questions.length}
              />
            );
          })}

        <View style={styles.buttons}>
          <TextButton
            style={{
              backgroundColor: "white",
              margin: 10,
              color: "purple",
              borderColor: "purple",
              borderWidth: 3,
            }}
            onPress={() =>
              this.props.navigation.push("Card", {
                id: id,
              })
            }
          >
            Add Card
          </TextButton>
          <TextButton
            style={{
              backgroundColor: "purple",
              margin: 10,
              borderColor: "purple",
            }}
            onPress={() =>
              this.props.navigation.push("Quiz", {
                id: id,
              })
            }
          >
            Start Quiz
          </TextButton>
          <TextButton
            style={{
              backgroundColor: "white",
              borderColor: "#C71585",
              color: "#C71585",
              margin: 10,
            }}
            onPress={() => {
              deleteDeck({ title: id });
              this.props.navigation.goBack();
            }}
          >
            Delete Deck
          </TextButton>
        </View>
      </Animated.View>
    );
  }
}

export default Deck;

const styles = StyleSheet.create({
  deckcard: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  value: {
    paddingTop: 10,
  },
  buttons: {
    padding: 10,
  },
});
