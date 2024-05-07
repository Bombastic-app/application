import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
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
  disabled = false, widthAuto = false,
  icon = false
}) => {
  const [rotation, setRotation] = useState("0deg");

  useEffect(() => {
    if (rotateLeft) setRotation("4deg");
  }, [rotateLeft]);

  useEffect(() => {
    if (rotateRight) setRotation("-4deg");
  }, [rotateRight]);

  return (
    <View className={className} style={{opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto', width: widthAuto ? 'auto' : '100%'}}>
      <TouchableNativeFeedback onPress={onClick}>
        <View
          className={`relative flex items-center w-full my-5 bg-white rounded-full overflow-hidden ${ icon ? 'p-16' : 'py-16' }`}
          style={{ transform: `rotate(${rotation})` }}>
          {gradient && (
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
              colors={[colors.blue, colors.purple, colors.pink]}
            />
          )}
          {icon && <ThumbDown />}
          {title && (
            <Heading3
              className={`${
                gradient ? "" : "!text-marine"
              } uppercase py-4`}>
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
    height: 100
  },
});
