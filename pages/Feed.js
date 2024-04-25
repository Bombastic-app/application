import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import BaseScreen from "../components/base/BaseScreen";
import LogoSVG from "../components/icons/Logo";
import PlayerStatistics from "../components/feed/PlayerStatistics";
import Post from "../components/feed/Post";
import { CONSTANTS } from "../constants";
import Heading5 from "../components/typography/Heading5";
import { useDispatch, useSelector } from "react-redux";
import firestore from "@react-native-firebase/firestore";
import Alert from "../components/notifications/Alert";
import {
  updateCurrentTurn,
  updateNotification,
  updatePlayerId,
} from "../store";
import { router } from "expo-router";

export default Feed = () => {
  const dispatch = useDispatch();
  const gameCode = useSelector((state) => state.gameCode);
  const playerId = useSelector((state) => state.playerId);
  const notification = useSelector((state) => state.notification);
  const currentTurn = useSelector((state) => state.currentTurn);
  const status = useSelector((state) => state.status);
  const [posts, setPosts] = useState(false);
  const loadedData = useRef(false);

  loadDataOnce = () => {
    firestore()
      .collection(`games/${gameCode}/players`)
      .doc(playerId)
      .onSnapshot((player) => {
        if (player.data()?.current) {
          if (!notification) dispatch(updateNotification(true));
          loadedData.current = true;
        } else {
          dispatch(updateNotification(false));
        }
      });

    firestore().collection(`games/${gameCode}/turns`).doc(currentTurn.toString()).onSnapshot((doc) => {
      if (doc.exists) {
        if (doc.data().miniGameReady) {
          setTimeout(() => {
            router.navigate('/mini-game/meme')
          }, 5000)
        }
      }
    })
  };

  useEffect(() => {
    if (!loadedData.current) loadDataOnce();
  }, [gameCode, currentTurn]);

  useEffect(() => {
    // if (playerId) dispatch(updatePlayerId('dTSpRKZsSrZcOjBH5cuZ'))
    if (currentTurn) {
      firestore()
        .collection(`games/${gameCode}/turns/${currentTurn}/posts`)
        .onSnapshot((docs) => {
          const postsToAdd = [];

          docs.forEach((doc) => {
            postsToAdd.push(doc.data());
          });

          setPosts(postsToAdd);
        });

      // fetch(`${process.env.EXPO_PUBLIC_API_URL}/post/add`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   // body: JSON.stringify({  })
      // })
    }
  }, [gameCode, playerId, currentTurn]);

  return (
    <BaseScreen headerShown={false}>
      <View className="gap-16 flex-1">
        <LogoSVG />
        <PlayerStatistics />
        <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View className="feed" style={{ gap: 10 }}>
            {posts &&
              posts.sort((a, b) => b.timestamp - a.timestamp).map((fPost, i) => {
                return <Post type={fPost.type} content={fPost.content} pseudo={fPost.pseudo} key={i} author={fPost.playerId} />;
              })}
          </View>
          {!posts || posts.length === 0 && (
            <View className="items-center justify-center flex-1">
              <Heading5 className="uppercase">
                Ton feed est actuellement vide
              </Heading5>
            </View>
          )}
        </ScrollView>
      </View>
    </BaseScreen>
  );
};
