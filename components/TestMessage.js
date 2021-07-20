import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import config from "../utils/config.json";
import InputField from "./common/InputField";
import ButtonField from "./common/ButtonField";
import { white, orange, red } from "../utils/color";
import { HamStorageKey, SpamStorageKey } from "../utils/keyStorage";

class TestMessage extends Component {
  static navigationOptions = () => {
    let headerTintColor = white;
    let headerStyle = { backgroundColor: orange };
    let headerTitleStyle = { paddingBottom: 10, fontSize: 20 };
    let title = "Requirements Form";
    return { headerTintColor, headerStyle, headerTitleStyle, title };
  };

  state = {
    loading: false,
    phoneNum: "",
    message: "",
    errors: {}
  };

  validate = () => {
    const errorsArr = {};
    const { phoneNum, message } = this.state;
    if (phoneNum.trim() === "")
      errorsArr.phoneNum = "Phone Number Is Required.";
    if (message.trim() === "") errorsArr.message = "Message Is Required.";
    return Object.keys(errorsArr).length === 0 ? null : errorsArr;
  };

  handleTextChange = (text, name) => {
    name === "phoneNum"
      ? this.setState({ phoneNum: text })
      : this.setState({ message: text });
  };

  doSubmit = async () => {
    this.setState({ loading: true });
    const { phoneNum, message } = this.state;
    try {
      const response = await fetch(
        `${config.baseUrl}/predict?phone_number=${phoneNum}&message=${message}`
      );
      const responseData = await response.json();
      if (responseData.isSpam === "0") {
        const existingMessages = await AsyncStorage.getItem(HamStorageKey);
        let newMessages = JSON.parse(existingMessages);
        if (!newMessages) {
          newMessages = [];
        }
        newMessages.unshift(responseData);
        try {
          await AsyncStorage.setItem(
            HamStorageKey,
            JSON.stringify(newMessages)
          );
          this.setState({ loading: false });
          this.props.navigation.navigate("Messages");
        } catch (err) {
          alert("Error Storing Ham Locally.");
          this.setState({ loading: false });
          this.props.navigation.navigate("Home");
        }
      } else if (responseData.isSpam === "1") {
        const existingMessages = await AsyncStorage.getItem(SpamStorageKey);
        let newMessages = JSON.parse(existingMessages);
        if (!newMessages) {
          newMessages = [];
        }
        newMessages.unshift(responseData);
        try {
          await AsyncStorage.setItem(
            SpamStorageKey,
            JSON.stringify(newMessages)
          );
          this.setState({ loading: false });
          this.props.navigation.navigate("SpamMessage");
        } catch (err) {
          alert("Error Storing Spam Locally.");
          this.setState({ loading: false });
          this.props.navigation.navigate("Home");
        }
      } else {
        alert("Something Went Wrong");
        this.setState({ loading: false });
        this.props.navigation.navigate("Home");
      }
    } catch (err) {
      alert("Error Connecting");
      this.setState({ loading: false });
      this.props.navigation.navigate("Home");
    }
  };

  handleSubmit = () => {
    Keyboard.dismiss();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.isLoading}>
          <ActivityIndicator color={red} size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.headerText}>
              Fill requirements below to receive message details
            </Text>
          </View>
          <InputField
            placeholder="Insert your phone number here"
            name="phoneNum"
            onChangeText={this.handleTextChange}
            error={this.state.errors.phoneNum}
          />
          <InputField
            placeholder="Insert your message here"
            name="message"
            onChangeText={this.handleTextChange}
            error={this.state.errors.message}
          />
          <ButtonField onPress={this.handleSubmit} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default TestMessage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    borderRadius: 8,
    marginLeft: 5,
    marginRight: 5
  },
  headerText: {
    fontSize: 20,
    color: orange,
    marginLeft: 15,
    fontWeight: "bold"
  },
  isLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
