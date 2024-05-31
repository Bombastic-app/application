import * as React from "react";
import Svg, { ClipPath, LinearGradient, Path } from "react-native-svg";
export default ImageMask = ({ children, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={337}
    height={361}
    fill="none"
    {...props}>
    <ClipPath id="clip">
      <Path
        fill="#293546"
        d="M314.505.174 18.157 27.6C7.869 28.551 0 37.183 0 47.514V341c0 11.046 8.954 20 20 20h273.107c10.485 0 19.191-8.098 19.948-18.555l23.241-320.911c.892-12.322-9.49-22.498-21.791-21.36Z"
      />
    </ClipPath>
    { children }
  </Svg>
);
