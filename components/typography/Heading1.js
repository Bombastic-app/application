import React from "react";
import Text from "./Text";

export default Heading1 = ({children, className, ...props}) => {
  return (
    <Text className={`font-balgin-black text-white text-50 text-center ${className}`}>{children}</Text>
  );
};