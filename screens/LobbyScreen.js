import { getDatabase, onValue, ref, update } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Constants from "expo-constants";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { RoundedButton } from "../components/RoundedButton";
import { db } from "../firebaseConfig";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";

export const LobbyScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Brice-BoldSemiExpanded": require("../assets/fonts/Brice-BoldSemiExpanded.ttf"),
  });
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const reference = useRef();
  const [groupName, setGroupName] = useState("");
  const [pseudo, setPseudo] = useState("Crocrotte");

  useEffect(() => {
    reference.current = ref(db, "groups");
    onValue(reference.current, (snapshot) => {
      const data = snapshot.val();
      setGroups(data);
    });
  }, []);

  createGroup = () => {};
  if (fontsLoaded) {
    return (
      <View
        style={{
          paddingVertical: insets.top,
          paddingHorizontal: 20,
          flex: 1,
          justifyContent: "space-between",
        }}>
        <Stack.Screen
          options={{
            title: "Lobby",
            headerStyle: { backgroundColor: "darkblue" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Text style={styles.appTitle}>{Constants.expoConfig?.name}</Text>
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
    );
  }
};

const styles = StyleSheet.create({
  appTitle: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
  },
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
