import { TextInput, View } from "react-native";
import BaseScreen from "../components/base/BaseScreen";
import Text from "../components/typography/Text";
import { RoundedButton } from "../components/base/RoundedButton";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

export default TweetToFill = ({ type, content, title }) => {
  const router = useRouter();
  const [tweet, setTweet] = useState();
  const gameCode = useSelector((state) => state.gameCode);
  const playerId = useSelector((state) => state.playerId);
  const pseudo = useSelector((state) => state.pseudo);

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
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} bounces={false} scrollEnabled={false}>
        <View className="flex-1 justify-between mt-28">
          <View>
            <Text className="font-balgin-black-italic font-bold text-28 mb-5 uppercase">
              {content}
            </Text>
            <TextInput
              className="font-balgin-black-italic font-bold text-28 text-blue placeholder:text-blue/40"
              placeholder="ÉCRIS LA SUITE ..."
              autoCapitalize="characters"
              autoFocus
              scrollEnabled={false}
              multiline
              maxLength={100}
              onChangeText={(text) => setTweet(text)}
              style={{paddingBottom: 1, textAlignVertical: "bottom"}}
            />
          </View>

          <RoundedButton background="bg-blue" disabled={!tweet} title={"Poster"} onClick={handleOnClickPublish} />
        </View>
      </KeyboardAwareScrollView>
    </BaseScreen>
  );
};
