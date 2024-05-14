import { StyleSheet, View } from "react-native"
import ReputationWhite from "../icons/Reputation-white";
import FollowersWhite from "../icons/Followers-white";
import MoneyWhite from "../icons/MoneyWhite";

export default Statistic = ({data}) => {
  return (
    <View className="flex-row items-center gap-24 justify-center mt-16">
      <ReputationWhite active={data.reputation != 0} />
      <FollowersWhite active={data.followers != 0} />
      <MoneyWhite active={data.money != 0} />
    </View>
  )
}