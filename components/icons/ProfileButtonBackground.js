import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg"

export default ProfileButtonBackground = ({style}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="131"
      height="51"
      fill="none"
      viewBox="0 0 131 51"
      style={style}
    >
      <Path
        fill="url(#paint0_linear_462_3055)"
        d="M124.443.861L11.428 6.264a6 6 0 00-5.649 5.117L1.016 43.623C.48 47.247 3.289 50.5 6.95 50.5H117.8a6 6 0 005.901-4.914l6.93-37.645c.7-3.802-2.326-7.264-6.187-7.08z"
      ></Path>
      <Defs>
        <LinearGradient
          id="paint0_linear_462_3055"
          x1="132"
          x2="0"
          y1="25.5"
          y2="25.5"
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
