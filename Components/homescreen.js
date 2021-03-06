import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import InputSection from "./inputSection";
import * as firebase from "firebase";
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBCPmZN72zgmaorpwkfrPUHwU5tr6MESN8",
  databaseURL: "https://regret-minimisation-project.firebaseio.com",
  projectId: "regret-minimisation-project",
});

const firestore = firebase.firestore();
firestore.settings({
  timestampsInSnapshots: true,
})

export default class Homescreen extends React.Component {
  state = {
    sadReasons: ["", "", ""],
    gladReasons: ["", "", ""],
    rating: "",
    data: [],
  };

  handleValueChange = (text, index) => {
    this.setState({
      sadReasons: [
        ...this.state.sadReasons.slice(0, index),
        text,
        ...this.state.sadReasons.slice(index + 1)
      ]
    });
  };

  handlePress = () => {
    firestore.collection('restaurants').get().then(response => {
      let data = []
      response.forEach(doc => {
        data = [...data, doc];
      })
      console.log(data);
      this.setState({
        data
      })
    })

    // firebase
    //   .firestore()
    //   .collection("SadGlad")
    //   .add({ date: new Date().getTime(), tag: "SAD", text: "asdfsafasdfsd" })
    //   .then(response => {
    //     console.log(response);
    //   });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify('data: ', this.state.data)}</Text>
        <InputSection
          title="SAD"
          onValueChange={this.handleValueChange}
          values={this.state.sadReasons}
        />
        <InputSection
          title="GLAD"
          onValueChange={this.handleValueChange}
          values={this.state.gladReasons}
        />
        <Text>Rating</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={rating => this.setState({ rating })}
          placeholder="Please input SAD reasons "
          value={this.state.rating}
        />
        <Button onPress={this.handlePress} title="Save Today" color="#841584" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
