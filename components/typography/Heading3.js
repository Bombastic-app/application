import React from "react";
import Text from "./Text";

export default Heading3 = ({children, className, ...props}) => {
  return (
    <Text className={`font-balgin-black-italic font-bold text-white text-20 ${className}`}>{children}</Text>
  );
};