import React from "react";
import Text from "./Text";

export default Heading5 = ({children, className, style, ...props}) => {
  return (
    <Text className={`font-balgin-bold font-bold text-white text-16 ${className}`} style={style}>{children}</Text>
  );
};