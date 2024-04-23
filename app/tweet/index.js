import { useLocalSearchParams } from "expo-router";
import TweetToFill from "../../pages/TweetToFill";

export default TweetPage = () => {
  let { type, content } = useLocalSearchParams();

  return (
    <TweetToFill type={type} content={content} />
  )
}