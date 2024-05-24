import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import Heading2 from "../../../components/typography/Heading2";
import { RoundedButton } from "../../../components/base/RoundedButton";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { manipulateAsync } from "expo-image-manipulator";
import ShapedImage from "../../../components/ShapedImage";

export const MiniGameMemeSetup = ({ updateStep }) => {
  const [title, setTitle] = useState();
  const [meme, setMeme] = useState(false);
  const [image, setImage] = useState(false);
  const playerId = useSelector((state) => state.playerId);
  const gameCode = useSelector((state) => state.gameCode);
  const currentTurn = useSelector((state) => state.currentTurn);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const uploadImage = async () => {
    if (image) {
      manipulateAsync(image, [], { compress: 0.5 }).then((imageCompressed) => {
        storage()
          .ref()
          .child(
            `/games/${gameCode}/turns/${currentTurn}/miniGame/${playerId}.png`
          )
          .putFile(imageCompressed.uri)
          .then(() => {
            fetch(`${process.env.EXPO_PUBLIC_API_URL}/mini-game/start`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ gameCode, playerId })
            }).then(() => {
              updateStep(2);
            })
          })
          .catch((error) => {
            console.log('error : ' + error);
          });
      });
    }
  };

  const takeImage = async () => {
    if (!status.granted) requestPermission();

    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setTitle("Top ! C'est ta meilleure pose.");
    }
  };

  useEffect(() => {
    setTitle("Voici le meme que tu dois imiter :");
  }, []);

  return (
    <View className="flex flex-col items-center gap-30 h-full justify-between">
      <Heading2 className="pt-50 text-center">{title}</Heading2>
      <View className="relative">
        <ShapedImage
          source={
            !image
              ? meme
                ? { uri: meme }
                : require("../../../assets/meme.png")
              : { uri: image }
          }
          // className="h-300 w-300 rounded-30 bg-pink object-cover"
        />
        {image && (
          <RoundedButton
            className="absolute right-40 bottom-10"
            icon
            widthAuto={true}
            onClick={takeImage}
          />
        )}
      </View>

      {!image ? (
        <RoundedButton title="Prendre une photo" onClick={takeImage} />
      ) : (
        <RoundedButton title="Confirmer" gradient onClick={uploadImage} />
      )}
    </View>
  );
};
