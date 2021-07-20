import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { lightgray, darkgray } from "../utils/color";

const MessageList = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.phoneStyle}>{message.phone_number}</Text>
      <Text style={styles.messageStyle}>{message.message}</Text>
    </View>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: lightgray,
    height: 80,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5
  },
  phoneStyle: {
    fontSize: 17,
    marginLeft: 10
  },
  messageStyle: {
    flex: 0.8,
    flexWrap: "wrap",
    color: darkgray,
    overflow: "hidden",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "400",
    fontStyle: "italic"
  }
});
