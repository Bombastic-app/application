import React from "react";
import { useFonts } from "expo-font";
import Home from "../pages/Home";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import New_game from "./lobby/new_game";
import Join_game from "./lobby/join_game";
import Score from "../pages/Score";
import Text from "../components/typography/Text";
import Profile_picture from "./setup/profile_picture";
import { useSelector } from "react-redux";

NfcManager.start();

export default Page = ({ navigation }) => {
  const gameCode = useSelector(state => state.gameCode)
  const [fontsLoaded] = useFonts({
    "Brice-BoldSemiExpanded": require("../assets/fonts/Brice-BoldSemiExpanded.ttf"),
    "Balgin-BlackSmCondensed": require("../assets/fonts/Balgin Black Sm Condensed.ttf"),
    "Balgin-Narrow": require("../assets/fonts/balgintext-regularnarrow.otf"),
    "Balgin-NarrowBold": require("../assets/fonts/balgintext-boldnarrow.otf"),
  });

  if (fontsLoaded) {
    if (gameCode) return <Feed />
    else return <Home />
  }
};
