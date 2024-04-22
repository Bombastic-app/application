import { useLocalSearchParams } from "expo-router";
import TweetToFill from "../../pages/TweetToFill";

export default TweetPage = () => {
  let { data } = useLocalSearchParams();
  console.log('data', data);
  console.log('data.type', data.type);

  return (
    <TweetToFill type={data.type} content={data.content} />
  )
}