import { StyleSheet, View } from "react-native"
import Reputation from "../icons/Reputation";
import Followers from "../icons/Followers";
import Money from "../icons/Money";

export default Statistic = ({data}) => {
  return (
    <View className="flex-row items-center gap-24 justify-center mt-16">
      <Reputation active={data.reputation != 0} />
      <Followers active={data.followers != 0} />
      <Money active={data.money != 0} />
    </View>
  )
}