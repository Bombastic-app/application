import { View } from "react-native";
import Heading3 from "../typography/Heading3";
import Text from "../typography/Text";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import { RoundedButton } from "../base/RoundedButton";

export default Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    notification && (
      <View className="absolute top-60 flex self-center w-full h-full z-10">
        <View className="flex flex-col items-stretch h-full">
          <View className="w-full py-30 px-10 flex flex-col gap-y-15 rounded-30 bg-white">
            <Heading3 className={"text-center !text-marine uppercase"}>
              C'est ton tour !
            </Heading3>
            <Text className={"text-center !text-marine"}>
              Choisis une carte de ton jeu et scanne-là pour l’activer
            </Text>
          </View>
          <RoundedButton
            title="Je scanne ma carte"
            gradient
            onClick={() => {
              router.push("/turn");
            }}
          />
        </View>
      </View>
    )
  );
};
