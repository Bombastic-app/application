import Svg, { Path } from "react-native-svg"

export default Comment = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <Path
        fill="#fff"
        d="M3 10h7V8.5H3V10zm0-2.75h10v-1.5H3v1.5zM3 4.5h10V3H3v1.5zM0 16V1.5C0 1.087.147.734.44.44.735.148 1.088 0 1.5 0h13c.412 0 .766.147 1.06.44.293.294.44.647.44 1.06v10c0 .412-.147.766-.44 1.06-.294.293-.648.44-1.06.44H3l-3 3zm2.375-4.5H14.5v-10h-13v10.875l.875-.875z"
      ></Path>
    </Svg>
  );
}
