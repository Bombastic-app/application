import React from "react";
import { useFonts } from "expo-font";
import Home from "../pages/Home";
import Feed from "../pages/Feed";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import New_game from "./lobby/new_game";
import Join_game from "./lobby/join_game";
import Score from "../pages/Score";
import Text from "../components/typography/Text";
import Profile_picture from "./lobby/profile_picture";
import TurnPage from "./turn/index"
import { useDispatch, useSelector } from "react-redux";
import Reset from "./debug/reset";
import { MiniGameMemeChoice } from "../pages/MiniGames/Meme/Choice";
import { MiniGameMemeSetup } from "../pages/MiniGames/Meme/Setup";
import Top_stat from "./turn/top_stat";
import { updateGameCode } from "../store";

NfcManager.start();

export default Page = ({ navigation }) => {
  const gameCode = useSelector(state => state.gameCode)
  const playerId = useSelector(state => state.playerId)
  const [fontsLoaded] = useFonts({
    "Brice-BoldSemiExpanded": require("../assets/fonts/Brice-BoldSemiExpanded.ttf"),
    "Balgin-BlackSmCondensed": require("../assets/fonts/Balgin Black Sm Condensed.ttf"),
    "Balgin-BlackSmCondensedItalic": require("../assets/fonts/Balgin Black Sm Condensed Italic.ttf"),
    "Balgin-BoldSmCondensed": require("../assets/fonts/Balgin Bold Sm Condensed.ttf"),
    "Balgin-Narrow": require("../assets/fonts/balgintext-regularnarrow.otf"),
    "Balgin-NarrowBold": require("../assets/fonts/balgintext-boldnarrow.otf"),
  });
  const dispatch = useDispatch();

  if (fontsLoaded) {
    // dispatch(updateGameCode('057228'))
    // if (gameCode) return <Reset />
    // if (gameCode) return <Reset gameCode='057228' playerId='7Ye6O6TMX8sGNx1jOrSy' />
    // if (gameCode) return <Biography />
    // if (gameCode) return <Profile_picture />
    // if (gameCode) return <New_game />
    if (gameCode) return <FeedPage />
    // if (gameCode) return <TurnPage />
    // if (gameCode) return <MiniGameMeme />
    // if (gameCode) return <Top_stat />
    // if (gameCode) return <Vote />
    // if (gameCode) return <Score />
    else return <Home />
    // return <Home />
  }
};
