import { View } from "react-native"
import Text from "../typography/Text"
import ProgressCircle from "./ProgressCircle"

export default Statistic = ({ progress, data }) => {
  return (
    <View className="flex-row items-center gap-7">
      <ProgressCircle progress={progress} />
      <Text>{data}</Text>
    </View>
  )
}