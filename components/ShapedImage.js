import { Image, Path, Svg } from 'react-native-svg'
import { Image as ExpoImage } from 'expo-image'
import ImageMask from './icons/ImageMask'
import Animated from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import Star from './icons/Star'
import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap-rn'
import MaskedView from '@react-native-masked-view/masked-view'
import { BlurView } from 'expo-blur'
import { CustomEase } from 'gsap/all'

export default ShapedImage = ({ source }) => {
  const background = useRef()
  const backgroundContainer = useRef()
  const gradient = useRef()
  const firstStar = useRef()
  const secondStar = useRef()

  useEffect(() => {
    gsap.registerPlugin(CustomEase)
    CustomEase.create('shine', 'M0,0 C0.25,0.1 0.25,1 1,1')
    CustomEase.create('bgRotate', 'M0,0 C0.25,1 0.5,1 1,1 ')

    gsap
      .timeline()
      .fromTo(
        backgroundContainer.current,
        {
          transform: { scale: 0.5, rotate: 90 },
        },
        {
          transform: { scale: 1, rotate: 0 },
          ease: 'bgRotate',
          duration: 0.7,
        },
        0.1
      )
      .fromTo(
        gradient.current,
        {
          transform: { x: -350, y: 60, rotate: -110 },
        },
        {
          transform: { x: 350, y: 0, rotate: -110 },
          duration: 0.5,
          ease: 'shine',
        },
        0.4
      )
      .fromTo(
        firstStar.current,
        { transform: { scale: 0.01 }, style: { alpha: 0 } },
        {
          transform: { scale: 0.85, rotate: 15 },
          style: { alpha: 1 },
          duration: 0.6,
          ease: "elastic.out",
        },
        "<0.2"
      )
      .fromTo(
        secondStar.current,
        { transform: { scale: 0.01 }, style: { alpha: 0 } },
        {
          transform: { scale: 0.5, rotate: 15 },
          style: { alpha: 1 },
          duration: 0.6,
          ease: "elastic.out",
        },
        "<0.2"
      )
      
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View />
      <Star
        ref={firstStar}
        style={{ position: 'absolute', top: 0, left: -15, zIndex: 1 }}
      />
      <Star
        ref={secondStar}
        style={{ position: 'absolute', top: -30, left: 40, zIndex: 1 }}
      />

      <ImageMask>
        <Image
          width="100%"
          height="100%"
          href={source}
          preserveAspectRatio="xMidYMid slice"
          clipPath="#clip"
        />
      </ImageMask>
      <MaskedView
        style={styles.gradientContainer}
        maskElement={
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={337}
            height={361}
            fill="none"
          >
            <Path
              fill="#293546"
              d="M314.505.174 18.157 27.6C7.869 28.551 0 37.183 0 47.514V341c0 11.046 8.954 20 20 20h273.107c10.485 0 19.191-8.098 19.948-18.555l23.241-320.911c.892-12.322-9.49-22.498-21.791-21.36Z"
            />
          </Svg>
        }
      >
        <View intensity={30} ref={gradient} style={styles.gradientContainer}>
          <LinearGradient
            style={styles.gradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['transparent', 'rgba(255, 255, 255, 1)', 'transparent']}
          />
        </View>
      </MaskedView>
      <View ref={backgroundContainer} style={styles.backgroundContainer}>
        <ExpoImage
          ref={background}
          source={require('../assets/image-mask-bg.png')}
          style={styles.background}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '160%',
    height: '130%',
    opacity: 0.15,
    // transform: [{ rotate: '-110deg' }],
    zIndex: 2,
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 14,
    left: -9,
    zIndex: -1,
  },
  background: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
})
