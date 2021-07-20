import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { white, orange, lightgray } from "../utils/color";

class MessageDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const { titleName } = navigation.state.params;
    let headerTintColor = white;
    let headerStyle = { backgroundColor: orange };
    let headerTitleStyle = { paddingBottom: 10, fontSize: 20 };
    let title = `${titleName} Details`;
    return {
      title,
      headerTintColor,
      headerStyle,
      headerTitleStyle
    };
  };
  render() {
    const { message } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.phonenumContainer}>
          <Text style={styles.phoneText}>PHONE NUMBER :</Text>
          <Text style={styles.phoneNum}>{message.phone_number}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>MESSAGE :</Text>
          <Text style={styles.textMessage}>{message.message}</Text>
        </View>
      </View>
    );
  }
}

export default MessageDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: lightgray,
    overflow: "scroll",
    marginTop: "18%",
    marginBottom: "40%",
    width: "90%",
    marginLeft: 20
  },
  phonenumContainer: {
    flexDirection: "row",
    marginLeft: 25,
    marginTop: 18
  },
  phoneText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  phoneNum: {
    marginLeft: 10,
    fontSize: 15
  },
  messageContainer: {
    marginLeft: 25,
    marginTop: 20,
    marginRight: 7
  },
  messageText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  textMessage: {
    marginTop: 8,
    fontStyle: "italic",
    fontSize: 17
  }
});
