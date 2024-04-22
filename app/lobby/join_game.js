import { Stack, router, useLocalSearchParams } from "expo-router";
import { Image, Text, TextInput, View } from "react-native";
import { RoundedButton } from "../../components/base/RoundedButton";
import { useState } from "react";
import BaseScreen from "../../components/base/BaseScreen";
import UnderlineInput from "../../components/UnderlineInput";
import { generateGameCode } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { updateGameCode, updatePlayerId } from "../../store";

export default JoinGame = () => {
  const gameCode = useSelector(state => state.gameCode)
  const playerId = useSelector(state => state.playerId)
  const pseudo = useSelector(state => state.pseudo)
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  handleOnUpdateGameCode = (code) => {
    dispatch(updateGameCode(code))
  }

  handleOnUpdatePlayerId = (id) => {
    dispatch(updatePlayerId(id))
  }

  joinGame = () => {
    if (gameCode !== "" && gameCode !== undefined) {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/game/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameCode, pseudo }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200)
            router.push("/setup/profile_picture");
          if (res.status === 404 || res.status === 500) setError(res.message);
        })
        .catch((error) => {
          console.log("error joining game");
          console.log(error);
        });
    }
  };

  return (
    <BaseScreen>
      <View className="flex pt-110 h-full">
        <View className="flex items-center justify-center">
          <Image
            className="w-[80%]"
            resizeMode="contain"
            source={require("../../assets/logo-gradient.png")}
          />
        </View>
        <View className="pt-200">
          <View className="flex flex-col gap-y-20">
            <Heading5 className="uppercase">Code de partie</Heading5>
            <UnderlineInput
              placeholder="123456"
              onChange={(text) => handleOnUpdateGameCode(text)}
            />
          </View>
          <View className="w-full mt-30">
            <RoundedButton title={"Rejoindre une partie"} onClick={joinGame} />
          </View>
        </View>
        {error !== "" && (
          <View className="bg-white/10 p-24 rounded-12">
            <Text className="text-white text-16 font-balgin-narrow-bold uppercase text-center">
              {error}
            </Text>
          </View>
        )}
      </View>
    </BaseScreen>
  );
};
