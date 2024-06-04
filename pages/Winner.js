import { View } from "react-native";
import BaseScreen from "../components/base/BaseScreen";
import Heading3 from "../components/typography/Heading3";
import Heading1 from "../components/typography/Heading1";
import Heading2 from "../components/typography/Heading2";
import { RoundedButton } from "../components/base/RoundedButton";
import { useRouter } from "expo-router";
import ShapedImage from "../components/ShapedImage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default Winner = () => {
  const router = useRouter();
  const [winner, setWinner] = useState(false);
  const profilePictures = useSelector((state) => state.profilePictures);
  const gameCode = useSelector((state) => state.gameCode);
  const playerId = useSelector((state) => state.playerId);
  const currentTurn = useSelector((state) => state.currentTurn);

  useEffect(() => {
    firestore()
      .collection(`games/${gameCode}/turns`)
      .doc(`${currentTurn}`)
      .onSnapshot((turn) => {
        if (turn.data()?.winner) {
          setWinner(turn.data()?.winner);
        }
      });
  }, []);

  return (
    <BaseScreen>
      <View className="flex flex-col items-center pt-10">
        {winner &&
          <>
            <View className="flex flex-col items-center w-full gap-y-20 mb-70">
              <Heading3 className="uppercase">{winner === playerId ? 'Bravo ma star, tu a' : 'Dommage, la prochaine fois c\'est toi qui'}</Heading3>
              <Heading1>{winner === playerId ? 'Gagné !' : 'Gagneras'}</Heading1>
            </View>

            <View className="mb-60">
              <ShapedImage source={winner && profilePictures.find((np) => np.name === winner)?.url} />
            </View>

            <Heading2 className="uppercase mb-70">+1 point</Heading2>

            <RoundedButton
              title="Continuer"
              onClick={() => {
                router.navigate('/mini-game/start');
              }}
            />
          </>
        }
        {!winner &&
          <View className="text-center justify-center h-full">
            <Heading2>En attente du résultat...</Heading2>
          </View>
        }
      </View>
    </BaseScreen>
  )
}