import { Text as BaseText } from "react-native";

export default Text = ({ className, style, children }) => {
  return (
    <BaseText className={`text-beige text-14 ${className}`} style={style}>{ children }</BaseText>
  )
}