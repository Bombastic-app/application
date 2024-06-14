import React, { useEffect, useRef, useState } from "react";
import BaseScreen from "../components/base/BaseScreen";
import { Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { router, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../constants";
import Post from "../components/feed/Post";
import BackArrow from "../components/icons/BackArrow";
import { Image } from "expo-image";
import Text from "../components/typography/Text";
import OkButton from "../components/icons/OkButton";
import Comment from "../components/singlePost/Comment";
import firestore from "@react-native-firebase/firestore";

export default SinglePost = ({ type, content, pseudo, author, currentTurn, likes, dislikes }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(false);
  const gameCode = useSelector((state) => state.gameCode);
  const playerId = useSelector((state) => state.playerId);
  const profilePictures = useSelector((state) => state.profilePictures);
  const currentPseudo = useSelector((state) => state.pseudo);
  const profilePicture = profilePictures.find((np) => np.name === playerId)?.url;

  const handleOnClickProfilePicture = (playerId, pseudo) => {
    router.push({ pathname: "/profile", params: { playerId: playerId, hidden: true, pseudo } });
  };

  useEffect(() => {
    firestore()
      .collection(`games/${gameCode}/turns/${currentTurn}/posts/${author}/comments`)
      .onSnapshot((docs) => {
        const commentsToDisplay = [];

        docs.forEach((doc) => {
          const id = doc.id;
          commentsToDisplay.push({id, ...doc.data()});
        });

        setComments(commentsToDisplay);
      });
  }, []);

  const handleOnPostComment = () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/post/comment/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameCode,
        playerId,
        author,
        currentTurn,
        content: comment,
        pseudo: currentPseudo,
      }),
    }) 
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        setComment('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <BaseScreen headerShown={false}>
      <Pressable onPress={router.back} className="self-start mb-20 mt-10">
        <BackArrow />
      </Pressable>

      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} bounces={false} scrollEnabled={false}>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Post type={type} content={content} pseudo={pseudo} author={author} soloView={true} withBackground={false} likes={likes} dislikes={dislikes} />

          <View style={styles.divider}></View>

          <Text className="font-bold">{comments.length > 0 ? `${comments.length} commentaire${comments.length > 1 ? 's' : ''}` : 'Aucun commentaire'}</Text>

          <View className="mt-10 gap-10">
            {comments &&
              comments.sort((a, b) => b.timestamp - a.timestamp).map((fCom, i) => {
                return (
                  <Comment key={`comment-${i}`} id={fCom.id} pseudo={fCom.pseudo} author={fCom.playerId} postAuthor={author} content={fCom.content} onClickProfile={() => handleOnClickProfilePicture(fCom.playerId, fCom.pseudo)} />
                )
              })}
          </View>
        </ScrollView>

        <View className="flex-row gap-7 pt-15 items-center">
          <Image style={styles.profilePicture} source={profilePicture} />

          <TextInput
            className="font-libre-franklin text-white border border-white/10 placeholder:text-white/40"
            placeholder="Commenter la publication"
            onChangeText={(text) => setComment(text)}
            scrollEnabled={false}
            multiline
            maxLength={CONSTANTS.textInputMaxLength}
            style={styles.commentInput}
            value={comment}
          />

          <Pressable onPress={handleOnPostComment}>
            <OkButton />
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#fff',
    opacity: 0.12,
    width: '100%',
    height: 1,
    marginVertical: 10,
  },
  commentInput: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    objectFit: "cover",
    borderRadius: 100,
  },
});