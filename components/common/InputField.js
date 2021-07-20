import React from "react";
import { View, Text, TextInput, StyleSheet, Keyboard } from "react-native";
import { white, orange, darkgray } from "../../utils/color";
const InputField = ({ placeholder, onChangeText, name, error }) => {
  return (
    <View
      style={name === "phoneNum" ? styles.phonenumInput : styles.messageInput}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={white}
        keyboardType={name === "phoneNum" ? "numeric" : "default"}
        maxLength={name === "phoneNum" ? 10 : 300}
        onBlur={Keyboard.dismiss}
        style={
          name === "phoneNum"
            ? styles.phonePlaceholder
            : styles.messagePlaceholder
        }
        onChangeText={text => onChangeText(text, name)}
      />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default InputField;
const styles = StyleSheet.create({
  phonenumInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: orange,
    backgroundColor: darkgray,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  phonePlaceholder: {
    marginLeft: 10,
    fontSize: 17
  },
  messageInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: orange,
    backgroundColor: darkgray,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 24
  },
  messagePlaceholder: {
    marginLeft: 10,
    fontSize: 17
  },
  errorContainer: {
    marginTop: 9
  },
  errorText: {
    fontSize: 15,
    color: "red",
    marginLeft: 15
  }
});
