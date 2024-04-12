import { useEffect, useRef, useState } from "react";
import React from "react";
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Slot, Stack, useRouter } from "expo-router";
import { RoundedButton } from "../components/base/RoundedButton";
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import BaseScreen from "../components/base/BaseScreen";
import Heading1 from "../components/typography/Heading1";

export default Home = () => {
  const router = useRouter();
  const [pseudo, setPseudo] = useState("Crocrotte");
  const [tagId, setTagId] = useState('')

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.NfcA);
      // the resolved tag object will contain `ndefMessage` property
      await NfcManager.getTag().then((tag) => {
        console.warn("Tag found", tag);
        setTagId(tag.id)
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
        'Content-Type': 'application/json'
      }
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
    if (tagId !== '') {
      console.log(tagId);
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/card/${tagId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [tagId]);

  return (
    <BaseScreen debug={true}>
      <View style={{flex: 1, justifyContent: "space-between"}}>
        <TouchableOpacity onPress={readNdef}>
          <Text>Scan a Tag</Text>
        </TouchableOpacity>

        <Heading1>{Constants.expoConfig?.name}</Heading1>

        <View style={{ rowGap: 40 }}>
          <View style={styles.container}>
            <Image source={require("../assets/illustration.png")} />
          </View>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "Brice-BoldSemiExpanded",
            }}>
            Sois le meilleur (ou le pire) des influenceurs !
          </Text>
          <View style={{ flexDirection: "column", rowGap: 15 }}>
            <TextInput
              placeholder="Saisis ton pseudo"
              style={{
                borderColor: "gray",
                borderWidth: 1,
                padding: 14,
                borderRadius: 45,
                textAlign: "center",
                fontSize: 21,
              }}
              onChangeText={(text) => setPseudo(text)}
              defaultValue="Crocrotte"
            />
            <RoundedButton
              title={"Créer une nouvelle partie"}
              onClick={() =>
                router.push({ pathname: "/lobby/new_game", params: { pseudo } })
              }
            />
            <RoundedButton
              title={"Rejoindre une partie"}
              onClick={() =>
                router.push({
                  pathname: "/lobby/join_game",
                  params: { pseudo },
                })
              }
            />
          </View>
        </View>
        {/* {groups && (
        <View>
          {Object.keys(groups).map((key, i) => (
            <View key={i} style={{ display: "flex", flexDirection: "column" }}>
              <View style={styles.groupContainer}>
                <Text>{key}</Text>
                <Button title="Join group" onPress={() => joinGroup(key)} />
              </View>
              {Object.values(groups[key]).map((player, i) => (
                <Text key={i}>{player.pseudo}</Text>
              ))}
            </View>
          ))}
        </View>
      )} */}
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