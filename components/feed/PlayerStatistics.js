import { View } from "react-native"
import Statistic from "./Statistic"
import { useSelector } from "react-redux";

export default PlayerStatistics = () => {
  const reputation = useSelector((state) => state.reputation);
  const followers = useSelector((state) => state.followers);
  const money = useSelector((state) => state.money);

  return (
    <View className="flex-row justify-between">
      <Statistic type="reputation" data={reputation} />
      <Statistic type="followers" data={followers} />
      <Statistic type="money" data={money} />
    </View>
  )
}