import { Image, Pressable, StyleSheet, View } from "react-native"
import Text from "../typography/Text"
import ThumbUp from "../icons/ThumbUp"
import ThumbDown from "../icons/ThumbDown"
import Comment from "../icons/Comment"
import Heading5 from "../typography/Heading5"
import storage from "@react-native-firebase/storage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react"

export default Post = ({ type, content, pseudo, author }) => {
  const gameCode = useSelector((state) => state.gameCode);
  const currentTurn = useSelector((state) => state.currentTurn);
  const [picture, setPicture] = useState();

  useEffect(() => {
    if (type == 'photo') {
      storage()
        .ref()
        .child(`/games/${gameCode}/turns/${currentTurn}/posts`)
        .listAll()
        .then((images) => {
          const image = images.items.find((item) => item.path.includes(author));
          image.getDownloadURL().then((url) => {
            setPicture(url);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <View style={styles.postBackground}>
      <View style={styles.centerMidGap}>
        <Image style={styles.profilePicture} source={require("../../assets/illustration.png")} />
        <Heading5 className="uppercase">@{pseudo}</Heading5>
      </View>

      {type == "text" && <Text>{content}</Text>}
      {type == "photo" && picture && 
        <>
          <Image style={styles.postImage} source={{uri: picture.url}} />
          <Text>{content}</Text>
        </>
      }

      <View style={styles.centerMidGap}>
        <View style={styles.centerLittleGap}>
          <Pressable onPress={() => console.log('like')}>
            <ThumbUp />
          </Pressable>
          <Text>3</Text>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.centerLittleGap}>
          <Pressable onPress={() => console.log('dislike')}>
            <ThumbDown />
          </Pressable>
          <Text>1</Text>
        </View>
      </View>

      <View>
        <Pressable onPress={() => console.log('comments')} style={styles.centerLittleGap}>
          <Comment />
          <Text>Aucun commentaire</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  postBackground: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    gap: 10
  },
  centerMidGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  centerLittleGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  separator: {
    backgroundColor: 'white',
    height: 11,
    width: 1
  },
  profilePicture: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 100
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 20
  }
});