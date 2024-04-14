import { Button, Image, Share, StyleSheet, Text, Touchable, TouchableHighlight, View } from "react-native";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { onValue, push, ref, set, update } from "firebase/database";
import { RoundedButton } from "../../components/base/RoundedButton";
import firestore from "@react-native-firebase/firestore";
import { Utils, generateGameCode } from "../../components/Utils";
import { Timestamp } from "firebase/firestore";
import BaseScreen from "../../components/base/BaseScreen";
import Cards from "../../components/icons/Cards";

export default NewGame = () => {
  const [gameCode, setGameCode] = useState("");
  const { pseudo } = useLocalSearchParams();
  const [players, setPlayers] = useState();
  const [screen, setScreen] = useState(false);
  const debug = useRef(true);

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
    Share.share({ message: 'Partage le lien de la partie avec tes amis !' })
    .then((result) => {
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
      }
    )
  }

  useEffect(() => {
    if (debug.current) setGameCode("123456");
    else setGameCode(generateGameCode());
  }, [debug.current]);

  useEffect(() => {
    if (gameCode !== "") {
      firestore()
        .collection("games")
        .doc(gameCode)
        .get()
        .then((game) => {
          console.log(game);
          if (!game.exists) {
            // Create game with gameCode generated
            firestore()
              .collection("games")
              .doc(gameCode)
              .set({
                timestamp: Timestamp.fromMillis(Date.now()),
              });
          } else {
            // Regenerate a new gameCode since the first one already exists
            if (!debug.current) setGameCode(generateGameCode());
          }
        });

      // firestore().collection(`groups/123456/games/XOnB0bKnYoL8bAoyzG8C/players`).doc('Lmy34r3iRMJkUYBORz2Q')
      // .onSnapshot((player) => {
      //   console.log(player.data());
      //   setScreen(player.data().screen)
      // })
    }
  }, [gameCode]);

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
          }}
        />
        <View className="flex flex-col items-center gap-y-20">
          <Text className="font-balgin-narrow-bold text-beige text-16 uppercase">
            Code de partie
          </Text>
          <Text className="font-balgin-black text-beige text-56">
            {gameCode}
          </Text>
        </View>
      </View>
      {/* <View style={{ rowGap: 8, flexDirection: "column" }}>
        {players &&
          Object.keys(players).map((pseudo, i) => (
            <Text
              key={i}
              style={{
                padding: 14,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 16,
                width: "100%",
              }}>
              {pseudo}
            </Text>
          ))}
      </View> */}
      <View className="flex flex-col gap-y-30">
        <View className="flex flex-col items-center gap-y-16 w-full bg-beige/10 p-24 rounded-12">
          <Cards />
          <Text className="text-beige text-16 font-balgin-narrow-bold uppercase text-center">
            Distribuez 5 cartes action par joueur avant de démarrer.
          </Text>
        </View>
        <TouchableHighlight className="self-center" onPress={shareLink}>
          <View className="pb-7 border-b-2 border-b-beige">
            <Text className="text-beige text-18 font-balgin-narrow-bold uppercase">Partager le lien</Text>
          </View>
        </TouchableHighlight>
        <RoundedButton
          title={"Lancer la partie"}
          // onClick={() =>
          //   router.push({
          //     pathname: "/setup/profile_picture"
          //   })
          // }
          onClick={runGame}
        />
      </View>
    </BaseScreen>
  );
};
