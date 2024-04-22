import React from "react";
import Text from "./Text";

export default Heading5 = ({children, className, ...props}) => {
  return (
    <Text className={`font-libre-franklin font-bold text-white text-16 ${className}`}>{children}</Text>
  );
};