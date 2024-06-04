import Svg, { Path, Circle } from "react-native-svg"
export default RadioButton = ({ style }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="27"
      fill="none"
      viewBox="0 0 26 27"
      style={style}
    >
      <Circle
        cx="13.054"
        cy="13.679"
        r="12"
        fill="#fff"
        fillOpacity="0.1"
        transform="rotate(4 13.054 13.679)"
      ></Circle>
    </Svg>
  );
}