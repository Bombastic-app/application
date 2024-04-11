import { onValue, ref } from "firebase/database";
import React from "react";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import NfcManager from 'react-native-nfc-manager';
import Home from "../pages/Home";

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