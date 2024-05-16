import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { colors } from "../Style"
import { forwardRef } from "react";

export default Star = forwardRef(({fill = colors.white, ...props}, ref) => (
  <Svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={58}
    height={58}
    fill="none"
    {...props}
  >
    <Path
      fill={ fill }
      d="M57.366 28.645C41.541 28.7 28.668 15.881 28.61 0 28.668 15.88 15.853 28.751 0 28.777c15.88-.054 28.755 12.764 28.812 28.59-.058-15.826 12.757-28.696 28.582-28.75l-.028.028Z"
    />
  </Svg>
))
