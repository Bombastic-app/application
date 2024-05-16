import React from "react";
import Svg, { Path } from "react-native-svg"
import { colors } from "../Style";
export default Money = ({ active, fill = colors.white, ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
      opacity={active ? 1 : 0.2}
    >
      <Path
        fill={ fill }
        d="M28.879 17.57c-.395 1.918-2.775 2.618-4.16 1.235a2.473 2.473 0 01-.718-1.753c0-.168.016-.34.05-.507a9.652 9.652 0 00-2.592-8.723c-2.372-2.4-5.73-3.294-8.835-2.66l6.492 7.41c.663.757.686 1.908.055 2.804a2.59 2.59 0 01-2.1 1.114 2.12 2.12 0 01-1.615-.712L8.13 7.418a9.693 9.693 0 00-.926.952l7.36 8.399c.663.757.686 1.908.054 2.806a2.59 2.59 0 01-2.098 1.113 2.114 2.114 0 01-1.615-.712l-5.891-6.723c-.063.447-.096.9-.096 1.352 0 0-.647 9.428 9.672 14.606a14.554 14.554 0 01-10.666-4.622c-4.05-4.32-4.958-10.545-2.755-15.723l-.656-.75C-.15 7.362-.173 6.209.458 5.313a2.588 2.588 0 012.1-1.114c.487 0 .962.15 1.35.459a14.28 14.28 0 01.986-.962c-.491-.748-.456-1.769.117-2.582A2.59 2.59 0 017.11 0c.606 0 1.194.231 1.615.712l.337.384C14.338-1.057 20.62.008 24.905 4.291a14.583 14.583 0 013.974 13.278z"
      ></Path>
    </Svg>
  );
}
