import { useState } from "react";
import Tabs from "../../components/common/Tabs";
import Feed from "../../pages/Feed";
import Profile from "../../pages/Profile";
import { useSelector } from "react-redux"

export default FeedPage = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const pseudo = useSelector((state) => state.pseudo);
  const playerId = useSelector((state) => state.playerId);

  return (
    <>
      <Tabs active={activeTab} handleActive={setActiveTab} />
      {activeTab === 'feed' && <Feed />}
      {activeTab === 'profile' && <Profile playerId={playerId} pseudo={pseudo} hidden={false} />}
    </>
  )
}