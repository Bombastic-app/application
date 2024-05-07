import React from "react";
import Text from "./Text";

export default Heading4 = ({children, className, ...props}) => {
  return (
    <Text className={`font-balgin-black-italic font-bold text-white text-18 ${className}`}>{children}</Text>
  );
};