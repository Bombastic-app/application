import { useLocalSearchParams } from "expo-router";
import Score from "../../pages/Score";

export default ScorePage = ({ navigation }) => {
  const { newScore } = useLocalSearchParams();

  return (
    <Score newScore={newScore} />
  )
}