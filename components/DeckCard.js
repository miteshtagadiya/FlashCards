import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const DeckCard = (props) => {
  return (
    <TouchableOpacity style={styles.deckcard} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.value}>{props.value} cards</Text>
    </TouchableOpacity>
  );
};

export default DeckCard;

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
});
