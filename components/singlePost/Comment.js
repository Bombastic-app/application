import { Pressable, StyleSheet, View } from "react-native"
import Text from "../typography/Text";
import ClickableProfilePicture from "../common/ClickableProfilePicture";
import { useSelector } from "react-redux";
import Trash from "../icons/Trash";
import firestore from "@react-native-firebase/firestore";

export default Comment = ({ id, content, pseudo, onClickProfile, author, postAuthor }) => {
  const playerId = useSelector((state) => state.playerId);
  const gameCode = useSelector((state) => state.gameCode);
  const currentTurn = useSelector((state) => state.currentTurn);

  const handleOnDelete = () => {
    firestore()
      .collection(`games/${gameCode}/turns/${currentTurn}/posts/${postAuthor}/comments`)
      .doc(id)
      .delete()
      .then(() => {
        console.log('Comment deleted');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.comment}>
      <View className="flex-row items-center justify-between">
        <ClickableProfilePicture pseudo={pseudo} type="comment" onClick={onClickProfile} />
        {playerId == author &&
          <Pressable onPress={handleOnDelete}>
            <Trash />
          </Pressable>
        }
      </View>
      <Text>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  comment: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    gap: 10,
  },
});