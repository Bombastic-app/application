import { TextBase } from "react-native";
import { Text as BaseText } from "react-native";

export default Text = ({ style, children }) => {
  return (
    <BaseText className="text-beige" style={style}>{ children }</BaseText>
  )
}