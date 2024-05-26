import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Heading5 from "../typography/Heading5";

export default ClickableProfilePicture = ({ pseudo, type, onClick }) => {
  const profilePicture =
    type == "news"
      ? require("../../assets/gossipnews.png")
      : require("../../assets/illustration.png");

  return (
    <Pressable className="self-start" onPress={onClick}>
      <View style={styles.centerMidGap}>
        <View className="relative">
          <Image style={styles.profilePicture} source={profilePicture} />
          {type == "news" && (
            <Image
              className="translate-y-10 absolute left-0 right-0 bottom-0 h-40 w-40"
              source={require("../../assets/hands.png")}
              cachePolicy={"memory-disk"}
            />
          )}
        </View>
        <Heading5 className="uppercase">
          @{type != "news" ? pseudo : "gossipnews"}
        </Heading5>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  centerMidGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profilePicture: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    objectFit: "cover",
    borderRadius: 100,
  },
});
