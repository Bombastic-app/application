import React from "react";
import Text from "./Text";

export default Heading5 = ({children, className, ...props}) => {
  return (
    <Text className={`font-libre-franklin font-bold text-beige text-16 text-center ${className}`}>{children}</Text>
  );
};