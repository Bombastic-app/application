import ShapedImage from '../components/ShapedImage'
import BaseScreen from '../components/base/BaseScreen'
import { StyleSheet, View } from 'react-native'
import Text from '../components/typography/Text'
import { Image } from 'expo-image'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap-rn'
import Heading2 from '../components/typography/Heading2'

export default TopStat = ({ title = "L'influenceur Dubaï", type = 'money' }) => {
  const [iconSizes, setIconSizes] = useState({ width: 0, height: 0 })
  const [gradientSizes, setGradientSizes] = useState({ width: 0, height: 0 })

  const timeline = useRef()
  const titleRef = useRef()
  const iconRef = useRef()
  const pointRef = useRef()

  const icon = {
    money: require('../assets/picto/money.png'),
    followers: require('../assets/picto/followers.png'),
    reputation: require('../assets/picto/reputation.png'),
  }

  const handleOnLayoutIcon = (e) => {
    setIconSizes({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    })
  }

  const handleOnLayoutGradient = (e) => {
    setGradientSizes({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    })
  }

  useEffect(() => {
    if (iconSizes && iconSizes.width) {
      timeline.current = gsap.timeline({ delay: 0.2 })
      timeline.current
        .fromTo(
          titleRef.current,
          {
            transform: { scale: 0.01, rotate: -10 },
          },
          {
            transform: { scale: 1 },
            duration: 0.58,
            ease: 'back.out',
          },
          0.2
        )
        .fromTo(
          iconRef.current,
          {
            transform: { scale: 0.01 },
          },
          {
            transform: { scale: 1 },
            duration: 0.3,
            ease: 'back.out',
          },
          0.45
        )
        .fromTo(
          pointRef.current,
          {
            transform: { y: 40 },
            style: { alpha: 0 },
          },
          {
            transform: { y: 0 },
            style: { alpha: 1 },
            duration: 0.4,
            ease: 'power3.out',
          },
          0.8
        )
    }
  }, [title, iconSizes.width])

  return (
    <BaseScreen>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.08,
        }}
      >
        <Image
          source={require('../assets/lights.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            overflow: 'visible',
          }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.playerImage}>
          <ShapedImage
            source={require('../assets/meme.png')}
            animation="scaling"
            isSlim={true}
          />
          <View
            style={{
              position: 'absolute',
              left: '50%',
              bottom: -200,
              width: '100%',
              height: 374,
              transform: [{ translateX: -(gradientSizes.width / 2 + 50) }],
              zIndex: 0,
            }}
            onLayout={handleOnLayoutGradient}
          >
            <Image
              source={require('../assets/radial-gradient.png')}
              contentFit="contain"
              cachePolicy={'memory-disk'}
              style={{
                width: '100%',
                height: '100%',
              }}
              
            />
          </View>
          <View
            style={{
              position: 'absolute',
              width: 80,
              height: 80,
              left: '50%',
              bottom: -15,
              transform: [{ translateX: -(iconSizes.width + 10) }],
              // backgroundColor: 'red',
            }}
            onLayout={handleOnLayoutIcon}
          >
            <View style={{ width: '100%', height: '100%' }} ref={iconRef}>
              <Image
                contentFit="contain"
                cachePolicy={'memory-disk'}
                source={icon[type]}
                style={{ width: '100%', height: '100%' }}
              />
            </View>
          </View>
        </View>
        <View style={{ position: 'relative', width: '100%', zIndex: 2 }}>
          <Text
            className="font-balgin-black-italic uppercase"
            style={styles.playerTitle}
            ref={titleRef}
          >
            {title}
          </Text>
        </View>
        <Text
          className="font-balgin-black-italic uppercase"
          style={styles.point}
          ref={pointRef}
        >
          + 1 point
        </Text>
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  playerImage: {
    position: 'relative'
  },
  playerTitle: {
    position: 'relative',
    fontSize: 50,
    textAlign: 'center',
    transform: [{ rotate: '-10deg' }],
    zIndex: 3,
  },
  point: {
    position: 'absolute',
    bottom: 40,
    fontSize: 30,
    opacity: 0,
  },
})
