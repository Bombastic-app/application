import React, { useState } from "react";
import BaseScreen from "../components/base/BaseScreen";
import { RoundedButton } from "../components/base/RoundedButton";
import { StyleSheet, TextInput, View } from "react-native";
import { router, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Heading2 from "../components/typography/Heading2";
import { useSelector } from "react-redux";

export default Biography = () => {
  const [bio, setBio] = useState();
  const gameCode = useSelector((state) => state.gameCode);
  const playerId = useSelector((state) => state.playerId);

  const handleOnClickDone = () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/player/bio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameCode,
        playerId,
        bio: bio.toLowerCase(),
      }),
    }) 
      .then((res) => res.json())
      .then((res) => {
        console.log("Biography added !");
      })
      .catch((error) => {
        console.log(error);
      });

    router.push({
      pathname: "/lobby/new_game",
    });
  };

  return (
    <BaseScreen headerShown={false}>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} bounces={false} scrollEnabled={false}>
        <View className="flex-1 justify-between mt-20">
          <View>
            <Heading2>Ajoute une biographie</Heading2>

            <TextInput
              className="font-balgin-black-italic font-bold text-28 text-white placeholder:text-white/40 mt-20"
              placeholder="ÉCRIS LA SUITE ..."
              autoCapitalize="characters"
              autoFocus
              scrollEnabled={false}
              multiline
              maxLength={100}
              onChangeText={(text) => setBio(text)}
              style={{paddingBottom: 1, textAlignVertical: "bottom"}}
            />
          </View>

          <RoundedButton disabled={!bio} title={"Let's go"} onClick={handleOnClickDone} />
        </View>
      </KeyboardAwareScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
    paddingTop: 48
  },
});