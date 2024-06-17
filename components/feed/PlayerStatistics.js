import { StyleSheet, View } from 'react-native'
import Statistic from './Statistic'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { Image } from 'expo-image'
import LottieView from 'lottie-react-native'
import { update } from 'firebase/database'
import { updateIsCurrentPlayer } from '../../store'
import { CONSTANTS } from '../../constants'

export default PlayerStatistics = () => {
  const reputation = useSelector((state) => state.reputation)
  const followers = useSelector((state) => state.followers)
  const money = useSelector((state) => state.money)
  const currentCard = useSelector((state) => state.currentCard)
  const isCurrentPlayer = useSelector((state) => state.isCurrentPlayer)
  const playerId = useSelector((state) => state.playerId)

  const dispatch = useDispatch()

  const [gifAnimation, setGifAnimation] = useState(false)
  const [highlightReputation, setHighlightReputation] = useState(false)
  const [highlightFollowers, setHighlightFollowers] = useState(false)
  const [highlightMoney, setHighlightMoney] = useState(false)

  const highlightReputationRef = useRef()
  const highlightFollowersRef = useRef()
  const highlightMoneyRef = useRef()

  const gifAnimations = {
    money: require('../../assets/money.gif'),
    followers: require('../../assets/followers.gif'),
    reputation: require('../../assets/reputation.gif'),
    moneyReputation: require('../../assets/moneyReputation.gif'),
    moneyFollowers: require('../../assets/moneyFollowers.gif'),
    reputationFollowers: require('../../assets/reputationFollowers.gif'),
    moneyReputationFollowers: require('../../assets/moneyReputationFollowers.gif'),
  }

  const highlightLottie = require('../../assets/stars-particles.json')

  useEffect(() => {
    if (isCurrentPlayer) {
      setTimeout(() => {
        dispatch(updateIsCurrentPlayer(false))
      }, 3500)

      if (
        currentCard.money &&
        currentCard.followers &&
        currentCard.reputation
      ) {
        setTimeout(() => {
          setGifAnimation(gifAnimations['moneyReputationFollowers'])
        }, 500)

        setTimeout(() => {
          setHighlightMoney(true)
          setHighlightReputation(true)
          setHighlightFollowers(true)
        }, 3500)
      } else if (currentCard.money && currentCard.reputation) {
        setTimeout(() => {
          setGifAnimation(gifAnimations['moneyReputation'])
        }, 500)

        setTimeout(() => {
          setHighlightMoney(true)
          setHighlightReputation(true)
        }, 3500)
      } else if (currentCard.money && currentCard.followers) {
        setTimeout(() => {
          setGifAnimation(gifAnimations['moneyFollowers'])
        }, 500)

        setTimeout(() => {
          setHighlightMoney(true)
          setHighlightFollowers(true)
        }, 3500)
      } else if (currentCard.followers && currentCard.reputation) {
        setTimeout(() => {
          setGifAnimation(gifAnimations['money'])
        }, 500)

        setTimeout(() => {
          setHighlightReputation(true)
          setHighlightFollowers(true)
        }, 3500)
      } else if (currentCard.reputation) {
        setTimeout(() => {
          setGifAnimation(gifAnimations['reputation'])
        }, 500)

        setTimeout(() => {
          setHighlightReputation(true)
        }, 3500)
      } else if (currentCard.followers) {
        setTimeout(() => {
          setGifAnimation(gifAnimations['followers'])
        }, 500)

        setTimeout(() => {
          setHighlightFollowers(true)
        }, 3500)
      } else if (currentCard.money) {
        setTimeout(() => {
          setGifAnimation(gifAnimations['money'])
        }, 500)

        setTimeout(() => {
          setHighlightMoney(true)
        }, 3500)
      }

      setTimeout(() => {
        setGifAnimation(false)
      }, 3000)
    }
  }, [currentCard, isCurrentPlayer])

  return (
    <>
      <View
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        {gifAnimation && (
          <Image
            style={{ position: 'relative', width: '100%', height: '100%', left: 0, right: 0 }}
            contentFit="cover"
            source={gifAnimation}
          />
        )}
      </View>
      <View className="flex-row justify-between" style={{ paddingHorizontal: CONSTANTS.paddingHorizontal }}>
        <View style={{ position: 'relative' }}>
          {highlightReputation && (
            <LottieView
              ref={highlightReputationRef}
              source={highlightLottie}
              style={styles.lottieTransition}
              autoPlay
              loop={false}
              onAnimationFinish={() => {
                setHighlightReputation(false)
              }}
              // resizeMode="cover"
            />
          )}
          <Statistic type="reputation" data={reputation} />
        </View>
        <View style={{ position: 'relative' }}>
          {highlightFollowers && (
            <LottieView
              ref={highlightFollowersRef}
              source={highlightLottie}
              style={styles.lottieTransition}
              autoPlay
              loop={false}
              onAnimationFinish={() => {
                setHighlightFollowers(false)
              }}
            />
          )}
          <Statistic type="followers" data={followers} />
        </View>
        <View style={{ position: 'relative' }}>
          {highlightMoney && (
            <LottieView
              ref={highlightMoneyRef}
              source={highlightLottie}
              style={styles.lottieTransition}
              autoPlay
              loop={false}
              onAnimationFinish={() => {
                setHighlightMoney(false)
              }}
            />
          )}
          <Statistic type="money" data={money} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  lottieTransition: {
    position: 'absolute',
    right: -38,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    pointerEvents: 'none',
    transform: [{ scale: 1.5 }],
  },
})
