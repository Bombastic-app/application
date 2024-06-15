import { Image, StyleSheet, TextInput, View } from 'react-native'
import BaseScreen from '../components/base/BaseScreen'
import Text from '../components/typography/Text'
import { RoundedButton } from '../components/base/RoundedButton'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import Heading2 from '../components/typography/Heading2'
import * as ImagePicker from 'expo-image-picker'
import storage from '@react-native-firebase/storage'
import { manipulateAsync } from 'expo-image-manipulator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CONSTANTS } from '../constants'
import { colors } from '../components/Style'

export default PhotoToFill = ({ type, content, title }) => {
  const router = useRouter()
  const [desc, setDesc] = useState()
  const [picture, setPicture] = useState(false)
  const gameCode = useSelector((state) => state.gameCode)
  const playerId = useSelector((state) => state.playerId)
  const currentTurn = useSelector((state) => state.currentTurn)
  const pseudo = useSelector((state) => state.pseudo)
  const currentCard = useSelector((state) => state.currentCard)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setPicture(result.assets[0].uri)
    }
  }

  const handleOnClickPublish = () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/post/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        content: content + ' ' + desc.toLowerCase(),
        type,
        gameCode,
        playerId,
        pseudo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message)
      })
      .catch((error) => {
        console.log('Failed to publish photo', error)
      })

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/player/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameCode,
        playerId,
        reputation: currentCard.reputation,
        followers: currentCard.followers,
        money: currentCard.money,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message)
      })
      .catch((error) => {
        console.log(error)
      })

    manipulateAsync(picture, [], { compress: 0.5 }).then((imageCompressed) => {
      storage()
        .ref()
        .child(`/games/${gameCode}/turns/${currentTurn}/posts/${playerId}.png`)
        .putFile(imageCompressed.uri)
        .then(() => {
          console.log('image uploaded in storage')
          router.push({
            pathname: '/feed',
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  return (
    <BaseScreen headerShown={false} style={{ backgroundColor: colors.marine }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        bounces={false}
        scrollEnabled={false}
      >
        <View className="flex-1 justify-between pt-28">
          <View className="items-center gap-30 flex-1">
            <Heading2 className="pt-3">{title}</Heading2>

            <View className="relative">
              <Image
                source={
                  picture ? { uri: picture } : require('../assets/default.png')
                }
                style={styles.picture}
              />
              {!picture && (
                <RoundedButton
                  widthAuto
                  className="absolute bottom-10 left-10 right-10"
                  title={'Choisir une photo'}
                  onClick={pickImage}
                />
              )}
            </View>
            <View className="flex-1 w-full">
              <Text className="font-balgin-black-italic font-bold text-28 mb-5 uppercase">
                {content}
              </Text>
              <TextInput
                className="font-balgin-black-italic font-bold text-28 text-pink placeholder:text-white/40"
                placeholder="ÉCRIS UNE DESCRIPTION ..."
                autoCapitalize="characters"
                onChangeText={(text) => setDesc(text)}
                scrollEnabled={false}
                multiline
                maxLength={CONSTANTS.textInputMaxLength}
              />
            </View>
          </View>

          <RoundedButton
            disabled={!picture || !desc}
            title={'Poster'}
            onClick={handleOnClickPublish}
            background="bg-pink"
          />
        </View>
      </KeyboardAwareScrollView>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  picture: {
    height: 300,
    borderRadius: 30,
    width: 300,
    objectFit: 'cover',
  },
})
