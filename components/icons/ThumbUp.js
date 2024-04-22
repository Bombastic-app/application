import Svg, { Path, Mask, G } from "react-native-svg"
export default ThumbUp = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <Mask
        id="mask0_510_495"
        style={{ maskType: "alpha" }}
        width="20"
        height="20"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <Path fill="#D9D9D9" d="M0 0H20V20H0z"></Path>
      </Mask>
      <G mask="url(#mask0_510_495)">
        <Path
          fill="#fff"
          d="M15.001 17.5H5.835V6.668L11.668.834l1.042 1.042c.097.097.177.229.24.395.062.167.093.327.093.48v.291l-.917 3.625h5.375c.445 0 .834.167 1.167.5.333.334.5.723.5 1.167v1.667c0 .097-.014.201-.042.312a9.926 9.926 0 01-.083.313l-2.5 5.875a1.684 1.684 0 01-.625.708 1.628 1.628 0 01-.917.292zm-7.5-1.666h7.5l2.5-5.833V8.334h-7.5l1.125-4.583-3.625 3.625v8.458zM5.835 6.667v1.667h-2.5v7.5h2.5v1.667H1.668V6.667h4.167z"
        ></Path>
      </G>
    </Svg>
  );
}