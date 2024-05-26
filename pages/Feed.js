import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
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
  updateFollowers,
  updateMoney,
  updateNotification,
  updatePlayerId,
  updateReputation,
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

        if (player.data()?.money) {
          dispatch(updateMoney(player.data().money));
        }

        if (player.data()?.reputation) {
          dispatch(updateReputation(player.data().reputation));
        }

        if (player.data()?.followers) {
          dispatch(updateFollowers(player.data().followers));
        }
      });

    firestore().collection(`games/${gameCode}/turns`).doc(currentTurn.toString()).onSnapshot((doc) => {
      if (doc.exists) {
        if (doc.data().miniGameReady) {
          // setTimeout(() => {
          //   router.navigate('/mini-game/meme')
          // }, 5000)
        }
      }
    })
  };

  const handleOnClickPost = (author, pseudo, type, content) => {
    router.push({ pathname: "/post", params: { author, pseudo, type, content, currentTurn } });
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
                return (
                  <Pressable onPress={() => handleOnClickPost(fPost.playerId, fPost.pseudo, fPost.type, fPost.content)} key={`feed-post-${i}`}>
                    <Post type={fPost.type} content={fPost.content} pseudo={fPost.pseudo} author={fPost.playerId} />
                  </Pressable>
                )
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
