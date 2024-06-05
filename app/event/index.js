import { useLocalSearchParams } from "expo-router";
import Event from "../../pages/Event";

export default EventPage = () => {
  let { content } = useLocalSearchParams();

  return (
    <Event content={content} />
  )
}