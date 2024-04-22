import React from "react";
import Text from "./Text";

export default Heading4 = ({children, className, ...props}) => {
  return (
    <Text className={`font-libre-franklin font-bold text-white text-18 text-center ${className}`}>{children}</Text>
  );
};