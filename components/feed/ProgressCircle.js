import Svg, { Circle, Stop, LinearGradient, Defs } from "react-native-svg"
export default ProgressCircle = ({ progress }) => {
  const radius = 35;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress / 100 * circumference;

  return (
    <>
      <Svg
        height={radius * 2}
        width={radius * 2}
        style={{ transform: [{ rotate: '-90deg' }] }}
        >
        <Defs>
          <LinearGradient id="linear" x1="54" x2="0.013" y1="26.572" y2="25.736" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FF9AEF"></Stop>
            <Stop offset="0.488" stopColor="#B78BFF"></Stop>
            <Stop offset="1" stopColor="#78E7FF"></Stop>
          </LinearGradient>
        </Defs>
        <Circle
          r={ normalizedRadius }
          cx={ radius }
          cy={ radius }
          stroke="#fff"
          strokeOpacity="0.2"
          strokeWidth="4"
          fill="transparent"
        >
        </Circle>
        <Circle
          fill="transparent"
          stroke="url(#linear)"
          strokeWidth={ stroke }
          strokeDasharray={ circumference + ' ' + circumference }
          style={ { strokeDashoffset } }
          stroke-width={ stroke }
          strokeLinecap="round"
          r={ normalizedRadius }
          cx={ radius }
          cy={ radius }
          />
      </Svg>
    </>
  );
}