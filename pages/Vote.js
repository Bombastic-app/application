import React, { useEffect, useState } from "react";
import BaseScreen from "../components/base/BaseScreen";
import { RoundedButton } from "../components/base/RoundedButton";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import Heading2 from "../components/typography/Heading2";
import Post from "../components/feed/Post";
import RadioButtonChecked from "../components/icons/RadioButtonChecked";
import RadioButton from "../components/icons/RadioButton";
import { colors } from "../components/Style";

export default Vote = () => {
  const router = useRouter();
  const [posts, setPosts] = useState(false);
  const [selected, setSelected] = useState(false);
  const gameCode = useSelector(state => state.gameCode);
  const currentTurn = useSelector(state => state.currentTurn);
  const playerId = useSelector(state => state.playerId);

  const handleOnVote = () => {
    console.log(gameCode);
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/post/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        gameCode,
        currentTurn,
        playerId,
        vote: selected,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.log('Failed to vote', error);
      });

    router.navigate('/vote/winner');
  };

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/post/get/turn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        gameCode,
        currentTurn,
        playerId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => {
        console.log('Failed to get posts from current turn', error);
      });

  }, []);

  return (
    <BaseScreen headerShown={false}>
      <Heading2 className="mt-20 mb-30">Quel contenu t'as fait grave goleri ?</Heading2>

      <ScrollView>
        <View className="gap-6 pt-10 pb-10">
          {posts &&
            posts.sort((a, b) => b.timestamp - a.timestamp).map((fPost, i) => {
              return (
                <Pressable onPress={() => setSelected(fPost.playerId)} className="relative" style={[i%2 === 0 ? styles.postEven : styles.postOdd, selected == fPost.playerId ? styles.active : '']} key={`vote-post-${i}`}>
                  <View style={styles.button}>
                    {selected == fPost.playerId ? <RadioButtonChecked /> : <RadioButton />}
                  </View>
                  <Post type={fPost.type} content={fPost.content} pseudo={fPost.pseudo} author={fPost.playerId} likes={fPost.likes} dislikes={fPost.dislikes} soloView={true} />
                </Pressable>
              )
            })}
        </View>
      </ScrollView>

      <RoundedButton onClick={handleOnVote} title="Valider" gradient disabled={!selected} />
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  postEven: {
    transform: [{rotate: '-4deg'}, {scale: 0.92}],
    borderWidth: 2,
    borderColor: colors.marine,
  },
  postOdd: {
    transform: [{rotate: '4deg'}, {scale: 0.92}],
    borderWidth: 2,
    borderColor: colors.marine,
  },
  button: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  active: {
    borderColor: colors.pink,
    borderRadius: 30,
  }
});