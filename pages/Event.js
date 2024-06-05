import BaseScreen from "../components/base/BaseScreen";
import { RoundedButton } from "../components/base/RoundedButton";
import { View } from "react-native";
import { useRouter } from "expo-router";
import Heading2 from "../components/typography/Heading2";

export default Event = ({ content }) => {
  const router = useRouter();

  return (
    <BaseScreen headerShown={false}>
      <View className="flex-1 justify-between">
        <View></View>
        <Heading2 className="">{content}</Heading2>
        <RoundedButton onClick={() => {router.push({ pathname: "/feed" })}} title="Continuer" gradient />
      </View>
    </BaseScreen>
  );
};