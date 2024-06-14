import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { RoundedButton } from '../components/base/RoundedButton'
import BaseScreen from '../components/base/BaseScreen'
import UnderlineInput from '../components/UnderlineInput'
import IconButton from '../components/base/IconButton'
import { useDispatch } from 'react-redux'
import { updatePseudo } from '../store'
import { Audio } from 'expo-av'

export default Home = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [sound, setSound] = useState()

  async function playSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/clic.mov')
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.playAsync()
  }

  handleOnUpdatePseudo = (text) => {
    dispatch(updatePseudo(text))
  }

  handleOnPressRules = () => {
    router.push({
      pathname: '/rules',
    })
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <BaseScreen title="Home" debug={false}>
      <View className="flex justify-between pt-110 h-full">
        <View className="flex items-center justify-center">
          <Image
            className="w-[80%]"
            resizeMode="contain"
            source={require('../assets/logo-gradient.png')}
          />
        </View>
        <View className="flex flex-col gap-y-30">
          <UnderlineInput
            placeholder="Ton pseudo"
            onChange={(text) => handleOnUpdatePseudo(text)}
          />
          <View className="flex flex-col gap-y-10">
            <RoundedButton
              title={'Créer une nouvelle partie'}
              gradient
              onClick={() => {
                playSound()
                router.push({
                  pathname: '/lobby/profile_picture',
                  params: { action: 'new_game' },
                })
              }}
            />
            <RoundedButton
              title={'Rejoindre une partie'}
              onClick={() => router.push('/lobby/join_game')}
            />
          </View>
        </View>
        <View className="flex flex-row items-center justify-center gap-x-30">
          <IconButton
            type={'reputation'}
            title={'Règles'}
            onPress={handleOnPressRules}
          />
          <IconButton type={'followers'} title={'Paramètres'} />
          <IconButton type={'money'} title={'Shop'} />
        </View>
      </View>
    </BaseScreen>
  )
}
