import { useEffect, useRef, useState } from "react";
import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { RoundedButton } from "../components/base/RoundedButton";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import BaseScreen from "../components/base/BaseScreen";
import Heading1 from "../components/typography/Heading1";
import { gsap } from "gsap-rn";
import Text from "../components/typography/Text";
import UnderlineInput from "../components/UnderlineInput";
import IconButton from "../components/base/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { updatePseudo } from "../store";

export default Home = () => {
  const router = useRouter();
  const pseudo = useSelector(state => state.pseudo)
  const dispatch = useDispatch()
  const [tagId, setTagId] = useState("");

  handleOnUpdatePseudo = (text) => {
    dispatch(updatePseudo(text))
  }

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.NfcA);
      // the resolved tag object will contain `ndefMessage` property
      await NfcManager.getTag().then((tag) => {
        // console.warn("Tag found", tag);
        setTagId(tag.id);
      });
    } catch (ex) {
      console.log("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  fetchCards = async () => {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [tagId]);

  useEffect(() => {
    // gsap.fromTo(appTitle.current, { transform: {y: -30} }, { transform: { y: 0 } })
  }, []);

  return (
    <BaseScreen title="Home" debug={false}>
      <View
        className="flex justify-between pt-110 h-full">
        {/* <TouchableOpacity onPress={readNdef}>
          <Text>Scan a Tag</Text>
        </TouchableOpacity> */}
        <View className="flex items-center justify-center">
          <Image
            className="w-[80%]"
            resizeMode="contain"
            source={require("../assets/logo-gradient.png")}
          />
        </View>
        <View className="flex flex-col gap-y-30">
          <UnderlineInput
            placeholder="Ton pseudo"
            onChange={(text) => handleOnUpdatePseudo(text)}
          />
          <View className="flex flex-col gap-y-10">
            <RoundedButton
              title={"Créer une nouvelle partie"}
              onClick={() =>
                router.push({
                  pathname: "/setup/profile_picture",
                  params: { action: "new_game" },
                })
              }
            />
            <RoundedButton
              title={"Rejoindre une partie"}
              onClick={() =>
                router.push("/lobby/join_game")
              }
            />
          </View>
        </View>
        <View className="flex flex-row items-center justify-center gap-x-30">
          <IconButton type={"reputation"} title={"Règles"} />
          <IconButton type={"followers"} title={"Paramètres"} />
          <IconButton type={"money"} title={"Shop"} />
        </View>
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  groupContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
