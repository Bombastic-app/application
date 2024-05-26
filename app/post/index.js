import { useLocalSearchParams } from "expo-router";
import SinglePost from "../../pages/SinglePost";

export default PostPage = () => {
  let { type, content, pseudo, author, currentTurn } = useLocalSearchParams();

  return (
    <SinglePost type={type} content={content} pseudo={pseudo} author={author} currentTurn={currentTurn} />
  )
}