import * as React from "react"
import Svg, { Path } from "react-native-svg"
export default BackArrow = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="15"
      fill="none"
      viewBox="0 0 22 15"
    >
      <Path
        fill="#fff"
        d="M7.7 5.77V0L0 7.5 7.7 15V9.23L22 10.386v-5.77L7.7 5.77z"
      ></Path>
    </Svg>
  );
}
