import React from "react";
import { ScrollView, View } from "react-native";
import BaseScreen from "../components/base/BaseScreen";
import LogoSVG from "../components/icons/Logo";
import PlayerStatistics from "../components/feed/PlayerStatistics";
import Post from "../components/feed/Post";
import { CONSTANTS } from "../constants";
import Heading5 from "../components/typography/Heading5";

export default Feed = () => {
  return (
    <BaseScreen headerShown={false}> 
      <View className="gap-16 flex-1">
        <LogoSVG />

        <PlayerStatistics />

        <ScrollView bounces={false} contentContainerStyle={{flexGrow: 1}}>
          <View className="feed" style={{gap: 10}}>
            <Post type="text" content="Avec @AirDown l’eau : capte l'odeur du pet et revent le avec AirDown ! buzz assuré." />
            <Post type="image" content={CONSTANTS.postImage} />
            <Post type="image" content={CONSTANTS.postImage} />
          </View>
          {/* <View className="items-center justify-center flex-1">
            <Heading5 className="uppercase">Ton feed est actuellement vide</Heading5>
          </View> */}
        </ScrollView>
      </View>
    </BaseScreen>
  );
};