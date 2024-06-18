import { Image, StyleSheet, View } from 'react-native'
import ProgressCircle from './ProgressCircle'
import Heading5 from '../typography/Heading5'
import { useSelector } from 'react-redux'
import Text from '../typography/Text'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap-rn'

export default Statistic = ({ data, type }) => {
  const currentCard = useSelector((state) => state.currentCard)
  const isCurrentPlayer = useSelector((state) => state.isCurrentPlayer)
  const addedStats = useRef()

  let picto
  switch (type) {
    case 'reputation':
      picto = require('../../assets/picto/reputation.png')
      break
    case 'followers':
      picto = require('../../assets/picto/followers.png')
      break
    case 'money':
      picto = require('../../assets/picto/money.png')
      break
    default:
      break
  }

  useEffect(() => {
    if (addedStats.current) {
      gsap.set(addedStats.current, { style: { alpha: 0 } })
      if (isCurrentPlayer) {
        if (
          currentCard.money ||
          currentCard.followers ||
          currentCard.reputation
        ) {
          gsap
            .timeline()
            .fromTo(
              addedStats.current,
              {
                transform: { y: 30 },
                style: { alpha: 0 },
              },
              {
                transform: { y: 0 },
                style: { alpha: 1 },
                duration: 0.5,
              }
            )
            .to(
              addedStats.current,
              {
                style: { alpha: 0 },
              },
              4
            )
        }
      }
    }
  }, [currentCard, isCurrentPlayer])

  return (
    <View className="flex-row items-center gap-5 relative">
      <ProgressCircle progress={data} />
      <Image style={styles.picto} source={picto} />
      {currentCard[type] !== 0 && (
        <Text
          className="font-balgin-black-italic italic text-26"
          style={{ position: 'absolute', right: -15, top: 0 }}
          ref={addedStats}
        >
          {currentCard[type] > 0 ? '+' : ''}
          {currentCard[type]}
          {type == 'reputation' ? '%' : 'M'}
        </Text>
      )}
      <Text>
        <Heading5 style={styles.number}>{data}</Heading5>
        <Heading5>{type == 'reputation' ? '%' : 'M'}</Heading5>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  picto: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 0,
    top: 0,
    transform: [{ translateX: 24 }, { translateY: 24 }],
  },
  number: {
    fontVariant: ['tabular-nums'],
    fontFamily: 'Libre Franklin',
  },
})
