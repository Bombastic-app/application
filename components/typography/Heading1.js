import React from "react";
import { StyleSheet, Text } from "react-native";

export default Heading1 = ({children}) => {
  return (
    <Text style={styles.title}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
  }
});