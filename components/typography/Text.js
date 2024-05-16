import { forwardRef } from "react";
import { Text as BaseText } from "react-native";

export default Text = forwardRef(({ className, style, children, onTextLayout }, ref) => {
  return (
    <BaseText onTextLayout={onTextLayout} className={`text-white text-14 ${className}`} style={style} ref={ref}>{ children }</BaseText>
  )
})