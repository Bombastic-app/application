import { Image, Pressable, StyleSheet, View } from "react-native"
import Text from "../typography/Text"
import ThumbUp from "../icons/ThumbUp"
import ThumbDown from "../icons/ThumbDown"
import Comment from "../icons/Comment"
import Heading5 from "../typography/Heading5"


export default Post = ({ type, content, pseudo }) => {
  return (
    <View style={styles.postBackground}>
      <View style={styles.centerMidGap}>
        <Image style={styles.profilePicture} source={require("../../assets/illustration.png")} />
        <Heading5 className="uppercase">@{pseudo}</Heading5>
      </View>

      {type == "text" && <Text>{content}</Text>}
      {type == "image" && <Image style={styles.postImage} source={{uri: content}} />}

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