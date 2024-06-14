import { View } from 'react-native'
import Statistic from './Statistic'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ResizeMode, Video } from 'expo-av'

export default PlayerStatistics = () => {
  const reputation = useSelector((state) => state.reputation)
  const followers = useSelector((state) => state.followers)
  const money = useSelector((state) => state.money)

  useEffect(() => {
    if (money && followers) {
    } else if (money && reputation) {
    } else if (followers && reputation) {
    } else if (reputation) {
    } else if (followers) {
    } else if (money) {
    }
  }, [money, followers, reputation])

  return (
    <>
      <View className="flex-row justify-between">
        <Statistic type="reputation" data={reputation} />
        <Statistic type="followers" data={followers} />
        <Statistic type="money" data={money} />
      </View>
    </>
  )
}
