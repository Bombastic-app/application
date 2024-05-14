import { useLocalSearchParams } from "expo-router";
import Profile from "../../pages/Profile";

export default ProfilePage = ({ navigation }) => {
  const { playerId, hidden, pseudo } = useLocalSearchParams();

  return (
    <Profile playerId={playerId} hidden={hidden} pseudo={pseudo} />
  )
}