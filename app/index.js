import React from "react";
import { useFonts } from "expo-font";
import Home from "../pages/Home";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

NfcManager.start();

export default Page = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Brice-BoldSemiExpanded": require("../assets/fonts/Brice-BoldSemiExpanded.ttf"),
  });

  if (fontsLoaded) {
    return (
      <Home />
    );
  }
};