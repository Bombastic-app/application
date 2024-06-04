import { View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image } from "expo-image";
import BaseScreen from "../../../components/base/BaseScreen";

export default Start = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.navigate('/mini-game/meme');
    }, 2500)
  }, []);

  return (
    <BaseScreen headerShown={false}>
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("../../../assets/ref.png")}
          contentFit="contain"
          cachePolicy={"memory-disk"}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    </BaseScreen>
  )
}