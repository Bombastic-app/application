import { Pressable, View } from "react-native";
import Heading2 from "../../../components/typography/Heading2";
import { useEffect, useRef, useState } from "react";
import storage from "@react-native-firebase/storage";
import { useSelector } from "react-redux";
import * as Haptics from "expo-haptics";
import Text from "../../../components/typography/Text";
import { Image } from "expo-image";
import { RoundedButton } from "../../../components/base/RoundedButton";
import Check from "../../../components/icons/Check";
import { router } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import { CONSTANTS } from "../../../constants";

export const MiniGameMemeChoice = () => {
  const [images, setImages] = useState([]);
  const [canVote, setCanVote] = useState(false);
  const [zoomInId, setZoomInId] = useState(false);
  const [zoomInImageSizes, setZoomInImagesSizes] = useState({ width: 0, height: 0 })
  const [active, setActive] = useState(false);
  const gameCode = useSelector((state) => state.gameCode);
  const currentTurn = useSelector((state) => state.currentTurn);
  const playerId = useSelector((state) => state.playerId);

  const zoomIn = (name) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setZoomInId(name);
  };

  const sendVote = () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/mini-game/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        gameCode,
        currentTurn,
        playerId,
        vote: active,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.log('Failed to vote', error);
      });

    router.push("/mini-game/winner");
  };

  const handleOnLayout = (e) => {
    setZoomInImagesSizes({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })
  }

  useEffect(() => {
    if (canVote) {
      storage()
        .ref()
        .child(`games/${gameCode}/turns/${currentTurn}/miniGame`)
        .listAll()
        .then((imagesFromStorage) => {
          imagesFromStorage.items.forEach((image) => {
            if (!image.name.includes(playerId)) {
              image.getDownloadURL().then((url) => {
                setImages((oldImages) => [...oldImages, {url, name: image.name.split(".")[0]}])
              });
            }
          });
        })
        .catch((error) => {
          console.log("error :" + error);
        });
    }
  }, [canVote]);

  useEffect(() => {
    firestore()
      .collection(`games/${gameCode}/turns/${currentTurn}/miniGame`)
      .onSnapshot((docs) => {
        if (docs.size === CONSTANTS.maxPlayers) {
          setCanVote(true);
        }
      });
  }, []);

  return (
    <View className="relative flex flex-col items-center gap-50 h-full">
     {!canVote &&
      <View className="flex-1 justify-center">
        <Heading2>En attente des autres joueurs ...</Heading2>
      </View>
     }

      {canVote &&
        <>
          <Heading2 className="pt-50">Qui est le plus convaincant ?</Heading2>

          <View className="flex flex-row flex-wrap justify-center gap-15 items-center w-full">
            {images &&
              images.map((image) => {
                return (
                  <View className="relative w-160 h-160" key={image.name}>
                    <Pressable
                      onLongPress={() => zoomIn(image.name)}
                      on
                      onPress={() => setActive(image.name)}>
                      <Image
                        contentFit="cover"
                        cachePolicy={"memory-disk"}
                        source={image.url}
                        style={{ width: 160, height: 160, borderRadius: 30 }}
                      />
                    </Pressable>
                    {active === image.name && (
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
                  <ShapedImage source={images.find((image) => zoomInId === image.name)} />
                </View>
              </Pressable>
            </View>
          )}

          {active !== false && (
            <RoundedButton className="absolute bottom-0" title="Valider mon vote" gradient onClick={sendVote} />
          )}
        </>
      }
    </View>
  );
};
