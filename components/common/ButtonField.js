import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { orange } from "../../utils/color";

const ButtonField = ({ onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Receive Details" color={orange} onPress={onPress} />
    </View>
  );
};

export default ButtonField;
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 26,
    marginLeft: 50,
    marginRight: 50
  }
});
