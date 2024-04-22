import { Image, StyleSheet, Text, View } from "react-native";
import { RoundedButton } from "../../components/base/RoundedButton";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Stack, router, useLocalSearchParams } from "expo-router";
import storage from "@react-native-firebase/storage";
import BaseScreen from "../../components/base/BaseScreen";
import Heading2 from "../../components/typography/Heading2";
import { generateGameCode } from "../../components/Utils";
import { useDispatch, useSelector } from "react-redux";
import { updateGameCode, updatePlayerId } from "../../store";

export default ProfilePicture = () => {
  const [image, setImage] = useState(false);
  const gameCode = useSelector((state) => state.gameCode);
  const playerId = useSelector((state) => state.playerId);
  const pseudo = useSelector((state) => state.pseudo);
  const dispatch = useDispatch();
  const { action } = useLocalSearchParams();
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

  handleOnUpdateGameCode = (code) => {
    dispatch(updateGameCode(code));
  };

  handleOnUpdatePlayerId = (id) => {
    dispatch(updatePlayerId(id));
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
          if (res.action === "regenerate")
            handleOnUpdateGameCode(generateGameCode());
        }
      });
  };

  useEffect(() => {
    if (!gameCode) {
      if (debug) handleOnUpdateGameCode("123456");
      else handleOnUpdateGameCode(generateGameCode());
    } else {
      if (playerId && action === "new_game") createGame();
    }
  }, [debug, gameCode, playerId]);

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
          handleOnUpdatePlayerId(res.playerId);
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

        {image && (
          <RoundedButton
            title="Let's go"
            onClick={() => {
              router.push("/lobby/new_game");
            }}
          />
        )}
      </View>
    </BaseScreen>
  );
};
