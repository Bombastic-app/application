import { View } from "react-native";
import BaseScreen from "../../components/base/BaseScreen";
import Heading3 from "../../components/typography/Heading3";
import Heading1 from "../../components/typography/Heading1";
import RoundedImage from "../../components/base/RoundedImage";
import Heading2 from "../../components/typography/Heading2";
import { RoundedButton } from "../../components/base/RoundedButton";
import { router } from "expo-router";

export default MiniGameWinner = () => {
  return (
    <BaseScreen>
      <View className="flex flex-col items-center pt-50 h-full w-full">
        <View className="flex flex-col items-center w-full gap-y-20 mb-70">
          <Heading3 className="uppercase">Bravo ma star, tu as</Heading3>
          <Heading1>Gagné !</Heading1>
        </View>
        <View className="mb-60">
          <RoundedImage
            imageUrl={
              "https://firebasestorage.googleapis.com/v0/b/gobelins-bombastic-manager.appspot.com/o/games%2F123456%2Fturns%2F1%2FminiGame%2FdTSpRKZsSrZcOjBH5cuZ.png?alt=media&token=da11ed76-5ceb-468d-8d02-0db4887c8cbf"
            }
          />
        </View>
        <Heading2 className="uppercase mb-70">+1 point</Heading2>
        <RoundedButton title="Continuer" onClick={() => { router.push('/score') }} />
      </View>
    </BaseScreen>
  );
};
