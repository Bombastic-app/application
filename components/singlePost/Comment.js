import { StyleSheet, View } from "react-native"
import Text from "../typography/Text";
import ClickableProfilePicture from "../common/ClickableProfilePicture";

export default Comment = ({ content, pseudo, onClick }) => {
  return (
    <View style={styles.comment}>
      <ClickableProfilePicture pseudo={pseudo} type="comment" onClick={onClick} />
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