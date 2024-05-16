import React from "react";
import Svg, { Path } from "react-native-svg"
import { colors } from "../Style";
export default Followers = ({ active, fill = colors.white, ...props }) => {
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
        fill={ fill }
        d="M14.215 11.902a5.944 5.944 0 100-11.889 5.944 5.944 0 000 11.889z"
      ></Path>
      <Path
        fill={ fill }
        d="M26.688 28.333c-.428.1-.86.069-1.248-.072-.604-.217-1.076-.705-1.335-1.337-.672-1.635-1.425-2.846-2.207-3.736-3.557-4.046-10.001.344-7.596 5.164.008.019.016.032.02.04-.213-.159-13.803-10.37-14.32-26.13C-.04 1.022.966 0 2.207 0A2.214 2.214 0 014.4 1.962c.337 2.957 1.496 8.453 5.496 10.777.188.11.46.226.765.34 1.151.427 2.374.619 3.601.624 12.199.04 14.057 11.925 14.057 11.925.373 1.184-.425 2.423-1.632 2.705z"
      ></Path>
    </Svg>
  );
}
