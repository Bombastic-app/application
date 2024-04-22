import { Image, StyleSheet, Text, View } from "react-native";
import { RoundedButton } from "../../components/base/RoundedButton";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Stack, router, useLocalSearchParams } from "expo-router";
import storage from "@react-native-firebase/storage";
import BaseScreen from "../../components/base/BaseScreen";
import Heading2 from "../../components/typography/Heading2";
import firestore from "@react-native-firebase/firestore";
import { generateGameCode } from "../../components/Utils";

// router.push({ pathname: "/lobby/new_game", params: { pseudo } })
// router.push({ pathname: "/lobby/join_game", params: { pseudo } })

export default ProfilePicture = () => {
  const [image, setImage] = useState(false);
  const { pseudo, joinGameCode, joinPlayerId } = useLocalSearchParams();
  const [gameCode, setGameCode] = useState(false);
  const [playerId, setPlayerId] = useState(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [debug, setDebug] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    if (!status.granted) requestPermission();

    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  createGame = async () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/game/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameCode, pseudo, playerId }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 500) {
          if (res.action === "regenerate") setGameCode(generateGameCode());
        }
      });
  };

  useEffect(() => {
    if (!gameCode) {
      if (joinGameCode) setGameCode(joinGameCode);
      else {
        if (debug) setGameCode("123456");
        else setGameCode(generateGameCode());
      }
    } else {
      if (joinPlayerId) setPlayerId(joinPlayerId);
      else {
        if (playerId && !joinPlayerId) createGame();
      }
    }
  }, [debug, gameCode, playerId, joinGameCode, joinPlayerId]);

  useEffect(() => {
    if (image && gameCode) {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/player/generateId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameCode }),
      })
        .then((res) => res.json())
        .then((res) => {
          setPlayerId(res.playerId);
        });
    }
  }, [image, gameCode]);

  useEffect(() => {
    if (playerId && image)
      storage()
        .ref()
        .child(`/profile_pictures/${playerId}.png`)
        .putFile(image)
        .then(() => {
          console.log("image uploaded");
        });
  }, [playerId]);

  return (
    <BaseScreen>
      <View className="flex flex-col w-full h-full items-center justify-between gap-y-20">
        <Heading2>Ajoute une photo de profil</Heading2>
        {!image && (
          <Image
            className="w-200 h-200 rounded-full bg-white/20"
            resizeMode="contain"
            source={require("../../assets/user.png")}
          />
        )}
        {image && (
          <Image
            source={{ uri: image }}
            className="w-200 h-200 object-cover rounded-full"
            defaultSource={{
              uri: "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1",
            }}
          />
        )}

        {!image && (
          <View className="w-full">
            <RoundedButton title="Prendre une photo" onClick={takePicture} />
            <RoundedButton title="Sélectionner une photo" onClick={pickImage} />
          </View>
        )}

        {image && <RoundedButton
            title="Let's go"
            onClick={() => {
              router.push({
                pathname: `/lobby/new_game`,
                params: { pseudo, playerId, gameCode },
              });
            }}
          />}
      </View>
    </BaseScreen>
  );
};
