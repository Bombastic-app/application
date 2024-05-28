import { Share, Text, TouchableHighlight, View } from "react-native";
import { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { RoundedButton } from "../../components/base/RoundedButton";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import BaseScreen from "../../components/base/BaseScreen";
import Cards from "../../components/icons/Cards";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "expo-image";
import { updateCurrentTurn, updateProfilePictures } from "../../store";

export default NewGame = () => {
  const gameCode = useSelector((state) => state.gameCode);
  const currentTurn = useSelector((state) => state.currentTurn);
  const dispatch = useDispatch();
  const playerId = useSelector((state) => state.playerId);
  const [players, setPlayers] = useState(false);
  const [pictures, setPictures] = useState([]);

  const shareLink = async () => {
    Share.share({
      message: "Partage le lien de la partie avec tes amis !",
    }).then((result) => {
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    });
  };

  const onStartGame = () => {
    if (!currentTurn) {
      dispatch(updateCurrentTurn(1));
      dispatch(updateProfilePictures(pictures));
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/game/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameCode }),
      })
        .then((res) => res.json())
        .then((res) => {
          router.push("/feed");
        });
    }
  };

  useEffect(() => {
    if (players) {
      players.forEach((player) => {
        if (!players.some(e => e.name === player.id)) {
      storage()
        .ref()
            .child(`/games/${gameCode}/profile_pictures/${player.id}.png`)
            .getDownloadURL()
            .then((url) => {
              const picture = {
                name: player.id,
                url: url,
              };

              setPictures((oldPictures) => [...oldPictures, picture]);
            });
        }
        });
    }
  }, [players]);

  useEffect(() => {
    if (gameCode) {
      firestore()
        .collection(`games/${gameCode}/players`)
        .onSnapshot((players) => {
          if (!players.empty)
            setPlayers(
              players.docs.map((player) => {
                return { ...player.data(), id: player.id };
              })
            );
        });
    }
  }, [gameCode]);

  return (
    <BaseScreen className="flex flex-col justify-between w-full h-screen bg-marine">
      <View>
        <View className="flex flex-col items-center gap-y-20">
          <Text className="font-balgin-narrow-bold text-white text-16 uppercase">
            Code de partie
          </Text>
          <Text className="font-balgin-black text-white text-56">
            {gameCode}
          </Text>
        </View>
      </View>
      {players && (
        <View className="flex flex-row justify-center items-center flex-wrap gap-x-60 gap-y-30 px-10">
          {players.map((player, i) => (
            <View className="flex flex-col items-center gap-y-10" key={`player-${i}`}>
              <View className="relative">
                {pictures && (
                  <Image
                    source={pictures.find((np) => np.name === player.id)?.url}
                    contentFit="cover"
                    cachePolicy={"memory-disk"}
                    style={{ width: 80, height: 80, borderRadius: 9999 }}
                  />
                )}
                <View className="absolute right-[0.5] bottom-[0.5] w-[20] h-[20] bg-[green] rounded-full border-4 border-marine"></View>
              </View>
              <Text className="text-14 text-white">
                @
                <Text className="text-14 text-white font-balgin-narrow">
                  {player.pseudo}
                </Text>
              </Text>
            </View>
          ))}
        </View>
      )}

      <View className="flex flex-col gap-y-30">
        <View className="flex flex-col items-center gap-y-16 w-full bg-white/10 p-24 rounded-12">
          <Cards />
          <Text className="text-white text-16 font-balgin-narrow-bold uppercase text-center">
            Distribuez 5 cartes action par joueur avant de démarrer.
          </Text>
        </View>
        <TouchableHighlight className="self-center" onPress={shareLink}>
          <View className="pb-7 border-b-2 border-b-white">
            <Text className="text-white text-18 font-balgin-narrow-bold uppercase">
              Partager le lien
            </Text>
          </View>
        </TouchableHighlight>
        <RoundedButton title={"Démarrer"} onClick={onStartGame} />
      </View>
    </BaseScreen>
  );
};
