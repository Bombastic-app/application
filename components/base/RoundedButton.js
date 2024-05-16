import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { colors } from "../Style";
import ThumbDown from "../icons/ThumbDown";
import Heading3 from "../typography/Heading3";

export const RoundedButton = ({
  title = false,
  onClick,
  rotateRight,
  rotateLeft,
  gradient,
  className,
  disabled = false,
  widthAuto = false,
  icon = false,
  background = "",
  color = colors.marine,
}) => {
  const [rotation, setRotation] = useState("0deg");

  useEffect(() => {
    if (rotateLeft) setRotation("4deg");
  }, [rotateLeft]);

  useEffect(() => {
    if (rotateRight) setRotation("-4deg");
  }, [rotateRight]);

  return (
    <View
      className={className}
      style={{
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? "none" : "auto",
        width: widthAuto ? "auto" : "100%",
      }}>
      <TouchableNativeFeedback onPress={onClick}>
        <View
          className={`relative flex items-center w-full my-5 rounded-full overflow-hidden ${
            icon ? "p-16" : "py-16"
          } ${background ? background : "bg-white"}`}
          style={{ transform: `rotate(${rotation})` }}>
          {gradient && (
            <View style={styles.gradientContainer}>
              <View style={styles.gradientOverlay}></View>
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
                colors={[colors.blue, colors.purple, colors.pink]}
              />
            </View>
          )}
          {icon && <ThumbDown />}
          {title && (
            <Heading3
              className="uppercase py-4"
              style={{ color: gradient ? colors.white : color }}>
              {title}
            </Heading3>
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 100,
  },
  gradientContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 100,
  },
  gradientOverlay: {
    position: "absolute",
    backgroundColor: '#000',
    opacity: 0.06,
    top: 0,
    left: 0,
    width: "100%",
    height: 100,
    zIndex: 1
  }
});
