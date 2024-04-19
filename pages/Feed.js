import React from "react";
import { ScrollView, View } from "react-native";
import BaseScreen from "../components/base/BaseScreen";
import LogoSVG from "../components/icons/Logo";
import PlayerStatistics from "../components/feed/PlayerStatistics";
import Post from "../components/feed/Post";
import { CONSTANTS } from "../constants";

export default Feed = () => {
  return (
    <BaseScreen headerShown={false}> 
      <View className="gap-16">
        <LogoSVG />

        <PlayerStatistics />

        <ScrollView bounces={false} contentInset={{bottom: 105}}>
          <View className="feed gap-10">
            <Post type="text" content="Avec @AirDown l’eau : capte l'odeur du pet et revent le avec AirDown ! buzz assuré." />
            <Post type="image" content={CONSTANTS.postImage} />
            <Post type="image" content={CONSTANTS.postImage} />
          </View>
        </ScrollView>
      </View>

    </BaseScreen>
  );
};