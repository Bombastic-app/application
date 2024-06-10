import { View } from "react-native";
import BaseScreen from "../../components/base/BaseScreen";
import Heading3 from "../../components/typography/Heading3";
import Heading1 from "../../components/typography/Heading1";
import Heading2 from "../../components/typography/Heading2";
import { RoundedButton } from "../../components/base/RoundedButton";
import { router } from "expo-router";
import storage from "@react-native-firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ShapedImage from "../../components/ShapedImage";
import firestore from "@react-native-firebase/firestore";
import { updateScore, upgradeScore } from "../../store";

export default MiniGameWinner = () => {
  const gameCode = useSelector((state) => state.gameCode);
  const currentTurn = useSelector((state) => state.currentTurn);
  const playerId = useSelector((state) => state.playerId);
  const score = useSelector((state) => state.score);
  const [imageUrl, setImageUrl] = useState();
  const [winner, setWinner] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    firestore()
      .collection(`games/${gameCode}/turns`)
      .doc(`${currentTurn}`)
      .onSnapshot((turn) => {
        if (turn.data()?.miniGameWinner) {
          setWinner(turn.data()?.miniGameWinner);
        }
      });
  }, []);

  useEffect(() => {
    if (winner) {
      storage()
        .ref()
        .child(`games/${gameCode}/turns/${currentTurn}/miniGame`)
        .listAll()
        .then((images) => {
          const image = images.items.find((item) => item.path.includes(winner));
          image.getDownloadURL().then((url) => {
            setImageUrl(url);
          });
        });

      if (winner === playerId) {
        fetch(`${process.env.EXPO_PUBLIC_API_URL}/player/score`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            gameCode,
            playerId,
            score: score + 1
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.message);
            dispatch(upgradeScore())
          })
          .catch((error) => {
            console.log('Failed to update winner score', error);
          });
      }
    }
  }, [winner]);

  return (
    <BaseScreen>
      <View className="flex flex-col items-center pt-10">
        {winner &&
          <>
            <View className="flex flex-col items-center w-full gap-y-20 mb-70">
              <Heading3 className="uppercase">{winner === playerId ? 'Bravo ma star, tu a' : 'Dommage pour toi, voici le'}</Heading3>
              <Heading1>{winner === playerId ? 'Gagné !' : 'Gagnant'}</Heading1>
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
          </>
        }
        {!winner &&
          <View className="text-center justify-center h-full w-full">
            <Heading2>En attente du résultat des votes ...</Heading2>
          </View>
        }
      </View>
    </BaseScreen>
  );
};
