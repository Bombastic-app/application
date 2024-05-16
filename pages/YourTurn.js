import React, { useEffect, useState } from "react";
import BaseScreen from "../components/base/BaseScreen";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { updateNotification } from "../store";
import { useSelector } from "react-redux";
import { RoundedButton } from "../components/base/RoundedButton";
import Heading2 from "../components/typography/Heading2";
import Heading4 from "../components/typography/Heading4";
import Statistics from "../components/card/Statistics";
import { colors } from "../components/Style";
import CardTitle from "../components/turn/CardTitle";

export default YourTurn = () => {
  const router = useRouter();
  const [tagId, setTagId] = useState("");
  const [cardData, setCardData] = useState({});
  const [scanError, setScanError] = useState(false);
  const [cardColor, setCardColor] = useState(colors.marine)

  const gameCode = useSelector((state) => state.gameCode);
  const playerId = useSelector((state) => state.playerId);
  const pseudo = useSelector((state) => state.pseudo);

  const dispatch = useDispatch();

  const cardColors = {
    tweet: colors.blue,
    photo: colors.pink,
    news: colors.blue,
  };

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.NfcA);
      // the resolved tag object will contain `ndefMessage` property
      await NfcManager.getTag().then((tag) => {
        // console.warn("Tag found", tag);
        setTagId(tag.id)
      });
    } catch (ex) {
      console.log("Oops!", ex);
      setScanError(true);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  useEffect(() => {
    if (tagId !== "") {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/card/${tagId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCardData(data);
          if (data.type) setCardColor(cardColors[`${data.type}`])
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [tagId]);

  useEffect(() => {
    setTimeout(() => {
      readNdef();
      dispatch(updateNotification(false))
    }, 1000);
  }, []);

  handleNews = (cardData) => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/post/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        content: cardData.content,
        type: cardData.type,
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
  }

  handleOnPlay = () => {
    console.log('Playing card', cardData);

    if (cardData.type == 'news') {
      handleNews(cardData);
      return;
    }

    router.push({
      pathname: '/' + cardData.type,
      params: { type: cardData.type, content: cardData.content, title: cardData.title }
    })
  };

  return (
    <BaseScreen headerShown={false} style={{ backgroundColor: cardColor }}>
      <View className="flex justify-center h-full">
        {/* <Image className="absolute top-0 left-0 w-full h-full z-10" source={require('../assets/transition.gif')} /> */}
        {/* If nothing scanned yet */}
        {tagId == '' && !scanError && <Heading2>C'est ton tour ! Scanne la carte de ton choix.</Heading2>}

        {/* If scan failed */}
        {scanError && tagId == "" && (
          <View className="flex flex-col gap-y-30 w-full">
            <Heading2 className="text-center">
              Le scan n'a pas fonctionné.
            </Heading2>
            <RoundedButton title="Réessayer" onClick={readNdef} />
          </View>
        )}

        {/* If scanned cart isn't found */}
        {tagId && !cardData.title && (
          <View className="flex flex-col gap-y-30 w-full">
            <Heading2 className="text-center">
              Cette carte n'est pas reconnue.
            </Heading2>
            <RoundedButton title="Réessayer" onClick={readNdef} />
          </View>
        )}

        {/* If scanned card found */}
        {tagId && cardData.title && (
          <View className="h-full justify-between">
            <Statistics data={{reputation: cardData.reputation, money: cardData.money, followers: cardData.followers}} />
            <CardTitle title={cardData.title} />
            <View>
              <Pressable onPress={readNdef} className="self-center mb-30">
                <Heading4 className="uppercase">{ cardData.type }</Heading4>
                <View className="h-[2px] bg-white mt-7 w-fit"></View>
              </Pressable>
              <RoundedButton
                title="Jouer cette carte"
                onClick={handleOnPlay}
                color={cardColor}
              />
            </View>
          </View>
        )}
      </View>
    </BaseScreen>
  );
};