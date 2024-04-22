import {
  Button,
  Image,
  Share,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { RoundedButton } from "../../components/base/RoundedButton";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import BaseScreen from "../../components/base/BaseScreen";
import Cards from "../../components/icons/Cards";

export default NewGame = () => {
  const { pseudo, gameCode, playerId } = useLocalSearchParams();
  const [players, setPlayers] = useState(false);
  const [profilePictures, setProfilePictures] = useState([]);
  const [screen, setScreen] = useState(false);
  const [debug, setDebug] = useState(false);

  runGame = async () => {
    // fetch(`${process.env.EXPO_PUBLIC_API_URL}/game/create`, {
    //   method: 'get',
    //   'Content-Type': 'application/json'
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);
    // })
  };

  shareLink = async () => {
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

  useEffect(() => {
    if (players) {
      // Get profile pictures on storage
      storage()
        .ref()
        .child("profile_pictures")
        .listAll()
        .then((images) => {
          images.items.map((item) => {
            item.getDownloadURL().then((url) => {
              const picture = {
                name: item.name.replace(".png", ""),
                url: url,
              };
              setProfilePictures((oldPictures) => [...oldPictures, picture]);
            });
          });
        });
    }
  }, [players]);


  useEffect(() => {
    console.log(gameCode);
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
      // Game code set
    }
  }, [debug, gameCode]);


  return (
    <BaseScreen className="flex flex-col justify-between w-full h-screen bg-marine">
      <View>
        <Stack.Screen
          options={{
            title: "Créer une partie",
            headerStyle: { backgroundColor: "rgb(var(--color-marine))" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerShown: false,
          }}
        />
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
            <View className="flex flex-col items-center gap-y-10" key={i}>
              <View className="relative">
                <Image
                  className="rounded-full"
                  defaultSource={{
                    uri: "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1",
                  }}
                  source={{
                    uri:
                      profilePictures &&
                      profilePictures.find(
                        (picture) => picture.name === player.id
                      )?.url,
                  }}
                  style={{ width: 80, height: 80 }}
                />
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
        <RoundedButton title={"Démarrer"} onClick={runGame} />
      </View>
    </BaseScreen>
  );
};
