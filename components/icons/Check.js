import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export default Check = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <Path
      fill="#F782E4"
      d="M4.24 9.048 2.4 6.7 0 9.048 4.63 13 13 2.233 10.043 0 4.24 9.048Z"
    />
  </Svg>
)
