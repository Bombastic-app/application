import { Image, StyleSheet, TextInput, View } from "react-native";
import BaseScreen from "../components/base/BaseScreen";
import Text from "../components/typography/Text";
import { RoundedButton } from "../components/base/RoundedButton";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import Heading2 from "../components/typography/Heading2";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";

export default PhotoToFill = ({ type, content, title }) => {
  const router = useRouter();
  const [desc, setDesc] = useState();
  const [picture, setPicture] = useState(false);
  const gameCode = useSelector((state) => state.gameCode);
  const playerId = useSelector((state) => state.playerId);
  const currentTurn = useSelector((state) => state.currentTurn);
  const pseudo = useSelector((state) => state.pseudo);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  const handleOnClickPublish = () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/post/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        content: content + ' ' + desc,
        type,
        gameCode,
        playerId,
        pseudo
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("posted !");
      })
      .catch((error) => {
        console.log(error);
      });
    
    storage()
      .ref()
      .child(`/games/${gameCode}/turns/${currentTurn}/posts/${playerId}.png`)
      .putFile(picture)
      .then(() => {
        console.log("image uploaded in storage");
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
        <View className="items-center gap-30">
          <Heading2>{title}</Heading2>

          <View className="relative">
            <Image source={picture ? {uri: picture} : require("../assets/default.png")} style={styles.picture} />
            {!picture && <RoundedButton widthAuto className="absolute bottom-10 left-10 right-10" title={"Choisir une photo"} onClick={pickImage} />}
          </View>

          <View className="flex-row gap-5">
            <Text className="font-libre-franklin font-bold text-28 mb-5">
              {content}
            </Text>
            <TextInput
              className="font-libre-franklin font-bold text-28 text-white placeholder:text-white/40"
              placeholder="Écris une description ..."
              onChangeText={(text) => setDesc(text)}
            />
          </View>
        </View>

        <RoundedButton disabled={!picture || !desc} title={"Poster"} onClick={handleOnClickPublish} />
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  picture: {
    height: 300,
    borderRadius: 30,
    width: 300,
    objectFit: "cover"
  },
});