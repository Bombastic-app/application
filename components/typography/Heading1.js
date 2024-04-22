import React from "react";
import { StyleSheet } from "react-native";
import Text from "./Text";

export default Heading1 = ({children, ...props}) => {
  return (
    <Text className='font-balgin-black text-beige text-50 text-center'>{children}</Text>
  );
};