import React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
export default RulesDots = ({ active = 0 }) => {
  const blankColor = '#243042';
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="156"
      height="7"
      fill="none"
      viewBox="0 0 156 7"
    >
      <Path
        fill={active == 0 ? "url(#paint0_linear_700_465)" : blankColor}
        d="M2.624 6.887l31.462-1.35A2 2 0 0036 3.539V2a2 2 0 00-2-2H3.203a2 2 0 00-1.95 1.552L.59 4.44a2 2 0 002.035 2.446z"
      ></Path>
      <Path
        fill={active == 1 ? "url(#paint1_linear_700_465)" : blankColor}
        d="M42.624 6.887l31.462-1.35A2 2 0 0076 3.539V2a2 2 0 00-2-2H43.203a2 2 0 00-1.95 1.552L40.59 4.44a2 2 0 002.035 2.446z"
      ></Path>
      <Path
        fill={active == 2 ? "url(#paint2_linear_700_465)" : blankColor}
        d="M82.624 6.887l31.462-1.35A2 2 0 00116 3.539V2a2 2 0 00-2-2H83.203a2 2 0 00-1.95 1.552L80.59 4.44a2 2 0 002.035 2.446z"
      ></Path>
      <Path
        fill={active == 3 ? "url(#paint3_linear_700_465)" : blankColor}
        d="M122.624 6.887l31.462-1.35A2 2 0 00156 3.539V2a2 2 0 00-2-2h-30.797a2 2 0 00-1.949 1.552l-.665 2.889a2 2 0 002.035 2.446z"
      ></Path>
      <Defs>
        <LinearGradient
          id="paint0_linear_700_465"
          x1="0"
          x2="35.773"
          y1="3.556"
          y2="6.403"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF9AEF"></Stop>
          <Stop offset="1" stopColor="#DC93F8"></Stop>
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_700_465"
          x1="40"
          x2="75.773"
          y1="3.556"
          y2="6.403"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#DC93F8"></Stop>
          <Stop offset="1" stopColor="#B68EFF"></Stop>
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_700_465"
          x1="80"
          x2="115.773"
          y1="3.556"
          y2="6.403"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#B68EFF"></Stop>
          <Stop offset="1" stopColor="#98BAFF"></Stop>
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_700_465"
          x1="120"
          x2="155.773"
          y1="3.556"
          y2="6.403"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#98BAFF"></Stop>
          <Stop offset="1" stopColor="#78E7FF"></Stop>
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
