import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { gray } from "../../utils/color";

const EmptyComponent = () => {
  return (
    <View>
      <Text style={styles.emptyText}>
        Pull down to refresh or click add icon below to receive (if any)
        details.
      </Text>
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 15,
    fontWeight: "700",
    color: gray,
    marginTop: "50%",
    marginLeft: "10%",
    marginRight: "5%"
  }
});
