import React from "react";
import Svg, { Path } from "react-native-svg"
export default ReputationWhite = ({ active }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="29"
      fill="none"
      viewBox="0 0 29 29"
      opacity={active ? 1 : 0.2}
    >
      <Path
        fill="#fff"
        d="M26.546 15.344c-3.071 4.414-9.093 4.184-11.814 6.313-2.773 2.168-.417 6.776-.323 6.96l-11.6-11.83C-.793 13.047-1.192 6.322 3.147 2.48c1.66-1.468 4.894-1.608 6.384-.117.027.027 1.042 1.002 1.064 2.566.23-.614 1.259-1.936 1.375-2.052C15.79-.947 21.998-.97 25.79 2.87c5.348 5.418 1.566 11.312.756 12.473z"
      ></Path>
    </Svg>
  );
}
