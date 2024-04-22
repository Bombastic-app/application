import React from "react";
import Text from "./Text";

export default Heading2 = ({children, className, ...props}) => {
  return (
    <Text className={`font-libre-franklin font-bold text-white text-32 ${className}`}>{children}</Text>
  );
};