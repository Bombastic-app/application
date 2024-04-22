import { TextBase } from "react-native";
import { Text as BaseText } from "react-native";

export default Text = ({ className, style, children }) => {
  return (
    <BaseText className={`text-beige ${className}`} style={style}>{ children }</BaseText>
  )
}