import React from "react";
import { Text, View, StyleSheet } from "react-native";
import TextButton from "./Button";

const DeckResult = (props) => {
  return (
    <View style={{ marginTop: 15 }}>
      <View style={styles.deckcard}>
        <Text style={styles.result}>
          {((props.correct * 100) / props.total).toFixed(2)} %
        </Text>
      </View>
      <View>
        <TextButton
          style={{
            backgroundColor: "#5cb85c",
            margin: 10,
            color: "white",
            borderColor: "#5cb85c",
            borderWidth: 3,
          }}
          onPress={props.onRestart}
        >
          Restart Quiz
        </TextButton>
        <TextButton
          style={{
            backgroundColor: "#5cb85c",
            margin: 10,
            color: "white",
            borderColor: "#5cb85c",
            borderWidth: 3,
          }}
          onPress={props.onBack}
        >
          Back to Deck
        </TextButton>
      </View>
    </View>
  );
};

export default DeckResult;

const styles = StyleSheet.create({
  deckcard: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  result: {
    fontSize: 42,
    padding: 30,
    fontWeight: "bold",
    color: "green",
  },
});
