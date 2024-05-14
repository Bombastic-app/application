import { View } from "react-native"
import Statistic from "./Statistic"

export default PlayerStatistics = ({ data }) => {
  return (
    <View className="flex-row justify-between">
      <Statistic type="reputation" progress={20} data="20%" />
      <Statistic type="followers" progress={45} data="3M" />
      <Statistic type="money" progress={66} data="6M" />
    </View>
  )
}