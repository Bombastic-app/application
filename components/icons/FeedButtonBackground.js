import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg"

export default FeedButtonBackground = ({style}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="124"
      height="44"
      fill="none"
      viewBox="0 0 124 44"
      style={style}
    >
      <Path
        fill="url(#paint0_linear_462_2991)"
        d="M117.624.113L6.174 6.19A6 6 0 00.5 12.18V37.5a6 6 0 006 6h106.644a6 6 0 005.931-5.092l4.807-31.396c.576-3.765-2.455-7.107-6.258-6.9z"
      ></Path>
      <Path
        fill="#000"
        fillOpacity="0.06"
        d="M117.624.113L6.174 6.19A6 6 0 00.5 12.18V37.5a6 6 0 006 6h106.644a6 6 0 005.931-5.092l4.807-31.396c.576-3.765-2.455-7.107-6.258-6.9z"
      ></Path>
      <Defs>
        <LinearGradient
          id="paint0_linear_462_2991"
          x1="125"
          x2="0.5"
          y1="21.605"
          y2="21.605"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F782E4"></Stop>
          <Stop offset="0.5" stopColor="#A07EFF"></Stop>
          <Stop offset="1" stopColor="#5ED7F1"></Stop>
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
