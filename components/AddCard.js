import * as React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import TextButton from "./Button";
import { addCardToDeck } from "../utils/database";

export default class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
    };
  }

  handleSubmit = () => {
    const { id } = this.props.route.params;
    addCardToDeck({
      title: id,
      card: { question: this.state.question, answer: this.state.answer },
    });
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "stretch", padding: 10 }}>
        <View>
          <Text style={styles.title}>Add Card</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Question"
            onChangeText={(name) => this.setState({ question: name })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Answer"
            onChangeText={(name) => this.setState({ answer: name })}
          />
          <View style={{ padding: 10 }}>
            <TextButton
              style={{ backgroundColor: "purple" }}
              onPress={this.handleSubmit}
            >
              Submit
            </TextButton>
          </View>
        </View>
      </View>
    );
  }
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
