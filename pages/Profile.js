import { ScrollView, View, Pressable } from "react-native";
import BaseScreen from "../components/base/BaseScreen"
import Heading5 from "../components/typography/Heading5"
import LogoSVG from "../components/icons/Logo"
import PlayerStatistics from "../components/feed/PlayerStatistics";
import { Image } from "expo-image";
import Heading2 from "../components/typography/Heading2";
import Text from "../components/typography/Text";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGameCode, updatePlayerId, updateScore } from "../store";
import firestore from "@react-native-firebase/firestore";
import Post from "../components/feed/Post";
import { router } from "expo-router";
import BackArrow from "../components/icons/BackArrow";

export default Profile = ({ hidden = false, playerId, pseudo }) => {
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState('');
  const dispatch = useDispatch();

  const gameCode = useSelector((state) => state.gameCode);
  const profilePictures = useSelector((state) => state.profilePictures);
  const score = useSelector(state => state.score);

  const postsToAdd = [];
  const certifImages = [
    require('../assets/certif/certif-00.png'),
    require('../assets/certif/certif-01.png'),
    require('../assets/certif/certif-02.png'),
    require('../assets/certif/certif-03.png'),
    require('../assets/certif/certif-04.png'),
    require('../assets/certif/certif-05.png'),
  ];

  useEffect(() => {
    firestore()
      .collection(`games/${gameCode}/turns`)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          firestore().collection(`games/${gameCode}/turns/${doc.id}/posts`).get().then((postsFromDatabase) => {
            postsFromDatabase.forEach((post) => {
              if (post.data().playerId === playerId) {
                postsToAdd.push(post.data());
                setPosts((old) => [...old, post.data()])
              }
            })
          })
        });
      })

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/player/${gameCode}/bio/${playerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }) 
      .then((res) => res.json())
      .then((data) => {
        setBio(data.biography);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/player/${gameCode}/score/${playerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }) 
      .then((res) => res.json())
      .then((data) => {
        if (data.score !== score) {
          dispatch(updateScore(data.score));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <BaseScreen headerShown={false}>
      { hidden ?
        <Pressable onPress={router.back} className="mt-10">
          <BackArrow />
        </Pressable>
        :
        <LogoSVG />
      }

      <View className="gap-20 mt-28 flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="items-start">
            <Image
              source={profilePictures.find((np) => np.name === playerId)?.url}
              contentFit="cover"
              cachePolicy={"memory-disk"}
              style={{ width: 100, height: 100, borderRadius: 9999 }}
            />

            <View className="mt-20 mb-10 flex-row gap-10">
              <Heading2>{pseudo}</Heading2>

              { !hidden &&
                <Image
                  source={certifImages[score]}
                  contentFit="contain"
                  cachePolicy={"memory-disk"}
                  style={{ width: 30, height: 30 }}
                />
              }
            </View>

            <Text>{bio}</Text>
          </View>

          <View className={hidden ? "border-t border-white/15" : "border-t border-b border-white/15 py-15"}>
            { !hidden && <PlayerStatistics /> }
          </View>

          <Heading5 className="uppercase mb-13">{ !hidden && <Heading5>Mes</Heading5> } Publications</Heading5>

          <View className="gap-10">
            {posts &&
              posts.sort((a, b) => b.timestamp - a.timestamp).map((fPost, i) => {
                return <Post type={fPost.type} content={fPost.content} pseudo={fPost.pseudo} key={`profile-post-${i}`} author={fPost.playerId} />;
              })}
          </View>
          {!posts || posts.length === 0 && (
            <View className="items-center justify-center flex-1">
              <Heading5 className="uppercase pt-3">
                Ce joueur n'a pas encore publié de contenu
              </Heading5>
            </View>
          )}
        </ScrollView>
      </View>
    </BaseScreen>
  )
}