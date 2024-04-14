import React from "react";
import { StyleSheet } from "react-native";
import Text from "./Text";

export default Heading1 = ({className, children}) => {
  return (
    <Text className={className} style={styles.title}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
  }
});