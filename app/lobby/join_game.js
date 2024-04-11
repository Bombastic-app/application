import { Stack, router, useLocalSearchParams } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { RoundedButton } from "../../components/base/RoundedButton";
import { useEffect, useRef, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default JoinGame = () => {
  const [groupId, setGroupId] = useState("123456");
  const { pseudo } = useLocalSearchParams();

  useEffect(() => {}, []);

  joinGame = () => {
    if (groupId !== "") {
      firestore()
        .collection(`groups/${groupId}/games`)
        .orderBy("timestamp", "desc")
        .limit(1)
        .get()
        .then((snapshot) => {
          const gameId = snapshot.docs[0].id;
          const playersRef = firestore().collection(
            `groups/${groupId}/games/${gameId}/players`
          );

          playersRef.get().then((players) => {
            if (
              players.docs.findIndex(
                (player) => player.data().pseudo === pseudo
              ) < 0
            ) {
              playersRef.add({ pseudo }).then((addedPlayer) => {
                const playerId = addedPlayer.id;

                fetch(`${process.env.API_URL}/players/add`, {
                  method: "POST",
                  body: { pseudo, groupId, gameId, playerId },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                  });
              });
            }
          });
        });
    }
  };

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <View>
        <Stack.Screen
          options={{
            title: "Rejoindre une partie",
            headerStyle: { backgroundColor: "darkblue" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Code de partie</Text>
        <View style={{ rowGap: 16 }}>
          <TextInput
            placeholder="Saisis ton pseudo"
            style={{
              borderColor: "gray",
              borderWidth: 1,
              padding: 14,
              borderRadius: 45,
              textAlign: "center",
              fontSize: 21,
              marginTop: 20,
            }}
            onChangeText={(text) => setGroupId(text)}
            defaultValue="123456"
          />
          <RoundedButton title={"Rejoindre une partie"} onClick={joinGame} />
        </View>
      </View>
    </View>
  );
};
