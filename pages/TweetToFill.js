import { TextInput, View } from "react-native";
import BaseScreen from "../components/base/BaseScreen";
import Text from "../components/typography/Text";
import { RoundedButton } from "../components/base/RoundedButton";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default TweetToFill = ({ type, content }) => {
  const router = useRouter();
  const [tweet, setTweet] = useState();
  const gameCode = useSelector((state) => state.gameCode);
  const playerId = useSelector((state) => state.playerId);
  const pseudo = useSelector((state) => state.pseudo)
  // const gameCode = '888888';
  // const playerId = '2pUYxkCWhjXuygSnq7wD';

  const handleOnClickPublish = () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/post/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        content: content + " " + tweet,
        type,
        gameCode,
        playerId,
        pseudo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("posted !");
      })
      .catch((error) => {
        console.log(error);
      });

    router.push({
      pathname: "/feed",
    });
  };

  return (
    <BaseScreen headerShown={false}>
      <View className="flex-1 justify-between mt-28">
        <View>
          <Text className="font-libre-franklin font-bold text-28 mb-5">
            {content}
          </Text>
          <TextInput
            className="font-libre-franklin font-bold text-28 text-white placeholder:text-white/40"
            autoCapitalize="none"
            autoFocus={true}
            placeholder="écris la suite ..."
            onChangeText={(text) => setTweet(text)}
          />
        </View>

        <RoundedButton title={"Poster"} onClick={handleOnClickPublish} />
      </View>
    </BaseScreen>
  );
};
