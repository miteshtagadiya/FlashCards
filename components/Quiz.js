import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import TextButton from "./Button";
import {
  getDeck,
  clearLocalNotification,
  setLocalNotification,
} from "../utils/database";
import CardFlip from "react-native-card-flip";
import DeckResult from "./DeckResult";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: {},
      start: 0,
      total: 0,
      correct: 0,
    };
  }

  componentDidMount() {
    const { id } = this.props.route.params;

    getDeck(id).then((item) =>
      this.setState({
        cards: item,
        total: item.questions.length,
      })
    );
  }

  componentDidUpdate(nextState, _nextProps) {
    if (nextState.start !== this.state.start) {
      if (this.state.start === this.state.total) {
        clearLocalNotification().then(setLocalNotification());
      }
    }
  }

  render() {
    const { id } = this.props.route.params;

    let { cards, start, total, correct } = this.state;
    return (
      <View style={{ padding: 15 }}>
        {Object.keys(cards).length > 0 && cards.questions.length === 0 && (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>
              Sorry, you cannot take a quiz because there are no cards in the
              deck
            </Text>
          </View>
        )}
        {Object.keys(cards).length > 0 &&
          cards.questions.length > 0 &&
          (start === total ? (
            <DeckResult
              correct={correct}
              total={total}
              onRestart={() =>
                this.setState({
                  correct: 0,
                  start: 0,
                })
              }
              onBack={() => {
                this.setState({
                  correct: 0,
                  start: 0,
                });
                this.props.navigation.push("Deck", {
                  id: id,
                });
              }}
            />
          ) : (
            <View>
              <Text style={styles.counter}>
                {start + 1}/{total}
              </Text>
              <CardFlip
                ref={(card) => (this.card = card)}
                style={styles.mainCard}
              >
                <View style={styles.deckcard}>
                  <Text style={styles.title}>
                    {cards.questions[start].question}
                  </Text>
                  <TouchableOpacity onPress={() => this.card.flip()}>
                    <Text style={styles.subText}>Answer</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.deckcard}>
                  <Text style={styles.title}>
                    {cards.questions[start].answer}
                  </Text>
                  <TouchableOpacity onPress={() => this.card.flip()}>
                    <Text style={styles.subText}>Question</Text>
                  </TouchableOpacity>
                </View>
              </CardFlip>
              <View>
                <TextButton
                  style={{
                    backgroundColor: "#5cb85c",
                    margin: 10,
                    color: "white",
                    borderColor: "#5cb85c",
                    borderWidth: 3,
                  }}
                  onPress={() =>
                    start < total
                      ? this.setState((prevState) => ({
                          start: prevState.start + 1,
                          correct: prevState.correct + 1,
                        }))
                      : null
                  }
                >
                  Correct
                </TextButton>
                <TextButton
                  style={{
                    backgroundColor: "#C71585",
                    borderColor: "#C71585",
                    color: "white",
                    margin: 10,
                  }}
                  onPress={() =>
                    start < total
                      ? this.setState((prevState) => ({
                          start: prevState.start + 1,
                        }))
                      : null
                  }
                >
                  Incorrect
                </TextButton>
              </View>
            </View>
          ))}
      </View>
    );
  }
}

export default Quiz;

const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    minHeight: 200,
    backfaceVisibility: "hidden",
  },
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
  deckcard: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  result: {
    fontSize: 42,
    padding: 30,
    fontWeight: "bold",
    color: "green",
  },
  subText: {
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 25,
  },
  counter: {
    backgroundColor: "white",
    width: 100,
    padding: 5,
    borderRadius: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    marginTop: 20,
  },
});
