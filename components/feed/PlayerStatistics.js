import { View } from "react-native"
import Statistic from "./Statistic"

export default PlayerStatistics = ({ data }) => {
  return (
    <View className="flex-row justify-between">
      <Statistic progress={66} data="6M" />
      <Statistic progress={45} data="3M" />
      <Statistic progress={20} data="20%" />
    </View>
  )
}