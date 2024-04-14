import React from "react";
import { useFonts } from "expo-font";
import Home from "../pages/Home";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import New_game from "./lobby/new_game";

NfcManager.start();

export default Page = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Brice-BoldSemiExpanded": require("../assets/fonts/Brice-BoldSemiExpanded.ttf"),
    "Balgin-BlackSmCondensed":  require("../assets/fonts/Balgin Black Sm Condensed.ttf"),
    "Balgin-Narrow":  require("../assets/fonts/balgintext-regularnarrow.otf"),
    "Balgin-NarrowBold":  require("../assets/fonts/balgintext-boldnarrow.otf")
  });

  if (fontsLoaded) {
    return (
      <New_game />
    );
  }
};