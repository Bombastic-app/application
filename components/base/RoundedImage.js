import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { colors } from "../Style";

export default RoundedImage = ({ size = "large", imageUrl }) => {
  return (
    <View
      className={`relative bg- ${
        size === "small" ? "w-160 h-160" : "w-300 h-300"
      } `}>
      <View className="relative p-3 z-1">
        <Image
          contentFit="cover"
          cachePolicy={"memory-disk"}
          source={imageUrl}
          style={{ width: "100%", height: "100%", borderRadius: 30, zIndex: 1 }}
        />
      </View>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
        colors={[colors.blue, colors.purple, colors.pink]}
      />
      {/* <View className="absolute w-full h-full border-2 border-pink rounded-30"></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 30
  },
});
