import { Pressable, View } from "react-native";
import Heading2 from "../../../components/typography/Heading2";
import { useEffect, useRef, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useSelector } from "react-redux";
import * as Haptics from "expo-haptics";
import Text from "../../../components/typography/Text";
import { Image } from "expo-image";
import { RoundedButton } from "../../../components/base/RoundedButton";
import Check from "../../../components/icons/Check";
import { router } from "expo-router";

export const MiniGameMemeChoice = () => {
  const [images, setImages] = useState([]);
  const [zoomInId, setZoomInId] = useState(false);
  const [active, setActive] = useState(false);
  const gameCode = useSelector((state) => state.gameCode);
  const currentTurn = useSelector((state) => state.currentTurn);
  const loadedData = useRef(false);

  const zoomIn = (i) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setZoomInId(i);
  };

  const sendVote = () => {
    // fetch(`${process.env.EXPO_PUBLIC_}`)
    router.push("/mini-game/winner");
  };

  useEffect(() => {
    storage()
          .ref()
          .child(`games/${gameCode}/turns/${currentTurn}/miniGame`)
          .listAll()
          .then((imagesFromStorage) => {
            imagesFromStorage.items.forEach((image, i) => {
              image.getDownloadURL().then((url) => {
                setImages((oldImagesUrl) => [...oldImagesUrl, url])
              });
            });
          })
          .catch((error) => {
            console.log("error :" + error);
          });
    // firestore()
    //   .collection(`games/${gameCode}/turns/${currentTurn}/miniGame`)
    //   .onSnapshot(() => {
    //     storage()
    //       .ref()
    //       .child(`games/${gameCode}/turns/${currentTurn}/miniGame`)
    //       .listAll()
    //       .then((imagesFromStorage) => {
    //         imagesFromStorage.items.forEach((image, i) => {
    //           image.getDownloadURL().then((url) => {
    //             setImages((oldImagesUrl) => {
    //               if (!oldImagesUrl.includes(url)) return [...oldImagesUrl, url]
    //             });
    //           });
    //         });
    //       })
    //       .catch((error) => {
    //         console.log("error :" + error);
    //       });
    //   });
  }, [gameCode, currentTurn]);

  return (
    <View className="relative flex flex-col items-center gap-50 h-full">
      <Heading2 className="pt-50">Qui est le plus convaincant ?</Heading2>
      <View className="flex flex-row flex-wrap justify-center gap-15 items-center w-full">
        {images &&
          images.map((imageUrl, i) => {
            return (
              <View className="relative w-160 h-160" key={i}>
                <Pressable
                  onLongPress={() => zoomIn(i)}
                  on
                  onPress={() => setActive(i)}>
                  <Image
                    contentFit="cover"
                    cachePolicy={"memory-disk"}
                    source={imageUrl}
                    style={{ width: 160, height: 160, borderRadius: 30 }}
                  />
                </Pressable>
                {active === i && (
                  <View className="absolute w-full h-full border-2 border-pink rounded-30">
                    <View className="absolute right-10 bottom-10 bg-white rounded-full p-7 z-10">
                      <Check />
                    </View>
                  </View>
                )}
              </View>
            );
          })}
      </View>
      <Text>Maintiens pour agrandir</Text>
      {zoomInId !== false && (
        <View className="absolute w-full h-full bg-marine/50">
          <Pressable
            onPress={() => setZoomInId(false)}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}>
            <View
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [
                  { translateX: -(zoomInImageSizes.width / 2) },
                  { translateY: -(zoomInImageSizes.height / 2) },
                ],
              }}
              onLayout={handleOnLayout}>
              <ShapedImage source={images.find((_, index) => zoomInId === index)} />
            </View>
          </Pressable>
        </View>
      )}
      {active !== false && (
        <RoundedButton title="Valider mon vote" gradient onClick={sendVote} />
      )}
    </View>
  );
};
