import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import BaseScreen from "../../../components/base/BaseScreen";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../components/Style";
import CardTitle from "../../../components/turn/CardTitle";

export default Start = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.navigate('/mini-game/meme');
    }, 2500)
  }, []);

  return (
    <BaseScreen headerShown={false}>
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
        colors={[colors.blue, colors.purple, colors.pink]}
      />
      <View className="flex-1 item-center justify-center">
        <CardTitle title="Deviens une ref" />
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});