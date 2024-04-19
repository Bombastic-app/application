import Svg, { Path, Mask, G } from "react-native-svg"
export default ThumbDown = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <Mask
        id="mask0_510_501"
        style={{ maskType: "alpha" }}
        width="20"
        height="20"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <Path fill="#D9D9D9" d="M0 0H20V20H0z"></Path>
      </Mask>
      <G mask="url(#mask0_510_501)">
        <Path
          fill="#C54545"
          d="M4.999 2.5h9.166v10.833l-5.833 5.834-1.042-1.042a1.095 1.095 0 01-.24-.396 1.364 1.364 0 01-.093-.479v-.292l.917-3.625H2.499c-.445 0-.834-.166-1.167-.5-.333-.333-.5-.722-.5-1.166V10c0-.097.014-.201.042-.313.027-.11.055-.215.083-.312l2.5-5.875c.125-.278.333-.514.625-.708.292-.195.597-.292.917-.292zm7.5 1.667h-7.5L2.499 10v1.667h7.5L8.874 16.25l3.625-3.625V4.167zm1.666 9.166v-1.666h2.5v-7.5h-2.5V2.5h4.167v10.833h-4.167z"
        ></Path>
      </G>
    </Svg>
  );
}