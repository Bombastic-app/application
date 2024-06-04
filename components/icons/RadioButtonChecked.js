import Svg, { Path, Circle } from "react-native-svg"
export default RadioButtonChecked = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="27"
      fill="none"
      viewBox="0 0 26 27"
    >
      <Circle
        cx="13.054"
        cy="13.679"
        r="12"
        fill="#fff"
        fillOpacity="0.1"
        transform="rotate(4 13.054 13.679)"
      ></Circle>
      <Path
        fill="#fff"
        d="M12.315 14.405l-2.833-3.612-3.691 3.612 7.124 6.08L25.791 3.92 21.241.484l-8.926 13.921z"
      ></Path>
    </Svg>
  );
}