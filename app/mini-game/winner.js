import { View } from "react-native";
import BaseScreen from "../../components/base/BaseScreen";
import Heading3 from "../../components/typography/Heading3";
import Heading1 from "../../components/typography/Heading1";
import Heading2 from "../../components/typography/Heading2";
import { RoundedButton } from "../../components/base/RoundedButton";
import { router } from "expo-router";
import storage from "@react-native-firebase/storage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ShapedImage from "../../components/ShapedImage";

export default MiniGameWinner = () => {
  const gameCode = useSelector((state) => state.gameCode);
  const currentTurn = useSelector((state) => state.currentTurn);
  const playerId = useSelector((state) => state.playerId);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    storage()
      .ref()
      .child(`games/${gameCode}/turns/${currentTurn}/miniGame`)
      .listAll()
      .then((images) => {
        const image = images.items.find((item) => item.path.includes(playerId));
        image.getDownloadURL().then((url) => {
          setImageUrl(url);
        });
      });
  }, []);

  return (
    <BaseScreen>
      <View className="flex flex-col items-center pt-50 h-full w-full">
        <View className="flex flex-col items-center w-full gap-y-20 mb-70">
          <Heading3 className="uppercase">Bravo ma star, tu as</Heading3>
          <Heading1>Gagné !</Heading1>
        </View>
        <View className="mb-60">
          <ShapedImage source={imageUrl} />
        </View>
        <Heading2 className="uppercase mb-70">+1 point</Heading2>
        <RoundedButton
          title="Continuer"
          onClick={() => {
            router.push("/score");
          }}
        />
      </View>
    </BaseScreen>
  );
};
