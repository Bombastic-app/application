import { Stack, router, useLocalSearchParams } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { RoundedButton } from "../../components/base/RoundedButton";
import { useState } from "react";
import BaseScreen from "../../components/base/BaseScreen";

export default JoinGame = () => {
  const [gameCode, setGameCode] = useState();
  const [error, setError] = useState("");
  const { pseudo } = useLocalSearchParams();

  joinGame = () => {
    if (gameCode !== "" && gameCode !== undefined) {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/game/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo: "Chachoune", gameCode }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) router.push({ pathname: "/lobby/new_game", params: { joinGameCode: gameCode } });
          if (res.status === 404 || res.status === 500) setError(res.message);
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

  return (
    <BaseScreen>
      <Stack.Screen
        options={{
          title: "Rejoindre une partie",
          headerShown: false,
        }}
      />
      <View className="flex flex-col w-full items-center gap-y-20">
        <Text className="font-balgin-narrow-bold text-beige text-16 uppercase">
          Code de partie
        </Text>
        <TextInput
          placeholder="123456"
          className="font-balgin-black text-beige text-56 border-b-2 border-b-beige placeholder:text-beige/30"
          onChangeText={(text) => setGameCode(text)}
          // defaultValue="123456"
        />
        <View className="w-full mt-20">
          <RoundedButton
            title={"Rejoindre une partie"}
            onClick={joinGame}
            gradient
          />
        </View>
        {error !== "" && (
          <View className="bg-beige/10 p-24 rounded-12">
          <Text className="text-beige text-16 font-balgin-narrow-bold uppercase text-center">{ error }</Text>
          </View>
        )}
      </View>
    </BaseScreen>
  );
};
