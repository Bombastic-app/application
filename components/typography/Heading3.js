import React from "react";
import Text from "./Text";

export default Heading3 = ({children, className, style, ...props}) => {
  return (
    <Text className={`font-balgin-black-italic font-bold text-white text-20 ${className}`} style={style}>{children}</Text>
  );
};