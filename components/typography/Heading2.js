import React from "react";
import Text from "./Text";

export default Heading2 = ({children, className, style, ...props}) => {
  return (
    <Text className={`font-balgin-black-italic font-bold text-white text-32 uppercase text-center ${className}`} style={style}>{children}</Text>
  );
};