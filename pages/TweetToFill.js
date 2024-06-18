import { TextInput, View } from 'react-native'
import BaseScreen from '../components/base/BaseScreen'
import Text from '../components/typography/Text'
import { RoundedButton } from '../components/base/RoundedButton'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { CONSTANTS } from '../constants'
import { colors } from '../components/Style'

export default TweetToFill = ({ type, content }) => {
  const router = useRouter()
  const [tweet, setTweet] = useState()
  const [loading, setLoading] = useState(false)
  const gameCode = useSelector((state) => state.gameCode)
  const playerId = useSelector((state) => state.playerId)
  const pseudo = useSelector((state) => state.pseudo)
  const currentCard = useSelector((state) => state.currentCard)

  const handleOnClickPublish = () => {
    setLoading(true)
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/post/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        content: content + ' ' + tweet.toLowerCase(),
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
        console.log('Failed to publish tweet', error)
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

    router.push({
      pathname: '/feed',
    })
  }

  return (
    <BaseScreen headerShown={false} style={{ backgroundColor: colors.marine }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        bounces={false}
        scrollEnabled={false}
      >
        <View className="flex-1 justify-between mt-28">
          <View>
            <Text className="font-balgin-black-italic font-bold text-28 mb-5 uppercase">
              {content}
            </Text>

            <TextInput
              className="font-balgin-black-italic font-bold text-28 text-blue placeholder:text-blue/40"
              placeholder="ÉCRIS LA SUITE ..."
              autoCapitalize="characters"
              autoFocus
              scrollEnabled={false}
              multiline
              maxLength={CONSTANTS.textInputMaxLength}
              onChangeText={(text) => setTweet(text)}
              style={{ paddingBottom: 1, textAlignVertical: 'bottom' }}
            />
          </View>

          <RoundedButton
            background="bg-blue"
            disabled={!tweet || loading}
            title={'Poster'}
            onClick={handleOnClickPublish}
          />
        </View>
      </KeyboardAwareScrollView>
    </BaseScreen>
  )
}
