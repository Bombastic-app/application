import { View } from 'react-native'
import Heading3 from '../typography/Heading3'
import Text from '../typography/Text'
import { useDispatch, useSelector } from 'react-redux'
import { router } from 'expo-router'
import { RoundedButton } from '../base/RoundedButton'
import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import { updateNotification } from '../../store'
import { CONSTANTS } from '../../constants'

export default Notification = () => {
  const notification = useSelector((state) => state.notification)
  const playerId = useSelector((state) => state.playerId)
  const isCurrentPlayer = useSelector((state) => state.isCurrentPlayer)
  const [sound, setSound] = useState()

  const dispatch = useDispatch()

  async function playSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/your-turn.mp3')
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.playAsync()
  }

  useEffect(() => {
    console.log(notification, isCurrentPlayer, playerId);
    // if (notification && isCurrentPlayer) {
    //   // setTimeout(() => {
    //     // playSound()
    //   // }, 3000)
    // }
  }, [notification, isCurrentPlayer])

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    notification && isCurrentPlayer && (
      <View className="absolute top-60 self-center w-full z-10" style={{ paddingHorizontal: CONSTANTS.paddingHorizontal }}>
        <View className="flex flex-col justify-between items-center h-full">
          <View className="w-full py-30 px-10 flex flex-col gap-y-15 rounded-30 bg-white">
            <Heading3 className={'text-center !text-marine uppercase'}>
              C'est ton tour !
            </Heading3>
            <Text className={'text-center !text-marine'}>
              Choisis une carte de ton jeu et scanne-là pour l’activer
            </Text>
          </View>
          <RoundedButton
            title="Je scanne ma carte"
            gradient
            onClick={() => {
              dispatch(updateNotification(false))
              router.push('/turn')
            }}
          />
        </View>
      </View>
    )
  )
}
