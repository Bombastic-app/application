import * as React from "react"
import Svg, { SvgProps, Rect } from "react-native-svg"
export default Cards = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={28}
    fill="none"
    {...props}
  >
    <Rect
      width={14.498}
      height={19.664}
      x={0.5}
      y={0.5}
      stroke="#fff"
      rx={2.5}
    />
    <Rect
      width={14.498}
      height={19.664}
      x={9.49}
      y={4.641}
      fill="#243042"
      stroke="#fff"
      rx={2.5}
      transform="rotate(15 9.49 4.641)"
    />
  </Svg>
)