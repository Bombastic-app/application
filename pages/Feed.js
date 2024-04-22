import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import BaseScreen from "../components/base/BaseScreen";
import LogoSVG from "../components/icons/Logo";
import PlayerStatistics from "../components/feed/PlayerStatistics";
import Post from "../components/feed/Post";
import { CONSTANTS } from "../constants";
import Heading5 from "../components/typography/Heading5";
import { useSelector } from "react-redux";
import firestore from "@react-native-firebase/firestore";

export default Feed = () => {
  const gameCode = useSelector(state => state.gameCode)
  const playerId = useSelector(state => state.playerId)
  const [posts, setPosts] = useState(false)

  useEffect(() => {
    firestore().collection(`games/${gameCode}/posts`).get()
    .then((docs) => {
      const postsToAdd = []

      docs.forEach((doc) => {
        postsToAdd.push(doc.data())
      })

      setPosts(postsToAdd)
    })
    console.log(gameCode);
    console.log(playerId);
    // fetch(`${process.env.EXPO_PUBLIC_API_URL}/post/add`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   // body: JSON.stringify({  })
    // })
  }, [gameCode, playerId])

  return (
    <BaseScreen headerShown={false}> 
      <View className="gap-16 flex-1">
        <LogoSVG />

        <PlayerStatistics />
        <ScrollView bounces={false} contentContainerStyle={{flexGrow: 1}}>
          <View className="feed" style={{gap: 10}}>
            { posts && posts.map((post, i) => {
              return <Post type={post.type} content={post.content} />
            })}
          </View>
          <View className="items-center justify-center flex-1">
            <Heading5 className="uppercase">Ton feed est actuellement vide</Heading5>
          </View>
        </ScrollView>
      </View>
    </BaseScreen>
  );
};