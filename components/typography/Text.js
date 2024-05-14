import { Text as BaseText } from "react-native";

export default Text = ({ className, style, children, onTextLayout }) => {
  return (
    <BaseText onTextLayout={onTextLayout} className={`text-white text-14 ${className}`} style={style}>{ children }</BaseText>
  )
}