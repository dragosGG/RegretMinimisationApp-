import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default ({ title, onValueChange, values }) => (
  <View>
    <Text>{title}</Text>
    {values.map((value, index) => (
      <TextInput
        key={index}
        style={{ height: 40, borderColor: "gray", borderWidth: 1, width: 300 }}
        onChangeText={text => onValueChange(text, index)}
        placeholder={`Please input ${title} reasons`}
        value={value}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({});
