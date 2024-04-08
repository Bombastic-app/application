import { Stack, router, useLocalSearchParams } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { useState } from "react";
import { onValue, ref, update } from "firebase/database";
import { db } from "../../firebaseConfig";

export default JoinGame = () => {
  const [gameCode, setGameCode] = useState("123456")
  const { pseudo } = useLocalSearchParams();

  joinGame = () => {
    if (gameCode !== "") {
      const updates = {};
      updates[`/groups/${gameCode}/${pseudo}`] = {
        isMain: false,
      };
      update(ref(db), updates)
      .then(() => {
        router.push({ pathname: '/lobby/new_game', params: { pseudo }})
      });
    }
  }

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
            onChangeText={(text) => setGameCode(text)}
            defaultValue="123456"
          />
          <RoundedButton
            title={"Rejoindre une partie"}
            onClick={joinGame}
          />
        </View>
      </View>
    </View>
  );
};
