import React, { useEffect, useRef, useState } from 'react'
import BaseScreen from '../components/base/BaseScreen'
import Text from '../components/typography/Text'
import { RoundedButton } from '../components/base/RoundedButton'
import { StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { CONSTANTS } from '../constants'
import { useSelector } from 'react-redux'
import Heading1 from '../components/typography/Heading1'
import LottieView from 'lottie-react-native'

export default Score = () => {
  const router = useRouter()
  // const score = useSelector((state) => state.score)
  const turnScore = useSelector((state) => state.turnScore)
  const [score, setScore] = useState(0)
  const [animation, setAnimation] = useState(false)
  const [startFrame, setStartFrame] = useState(false)
  const [endFrame, setEndFrame] = useState(false)

  const lottieRef = useRef()

  const index = ['certif_0', 'certif_20', 'certif_40', 'certif_60', 'certif_80']

  const lottieFiles = {
    certif_0: require('../assets/certif/certif_0.json'),
    certif_20: require('../assets/certif/certif_20.json'),
    certif_40: require('../assets/certif/certif_40.json'),
    certif_60: require('../assets/certif/certif_60.json'),
    certif_80: require('../assets/certif/certif_80.json')
  }

  const frames = {
    certif_0: {
      0: 14,
      1: 38,
      2: 68, 
      3: 98, 
      4: 128, 
      5: 240
    },
    certif_20: {
      1: 14, 
      2: 38, 
      3: 68, 
      4: 98, 
      5: 210, 
    },
    certif_40: {
      2: 14, 
      3: 38, 
      4: 68, 
      5: 180, 
    },
    certif_60: { 
      3: 14, 
      4: 38, 
      5: 150, 
    },
    certif_80: {
      4: 14, 
      5: 120, 
    }
  }

  useEffect(() => {
    setStartFrame(frames[index[score]][score])
    setEndFrame(frames[index[score]][turnScore - score])
    setAnimation(lottieFiles[index[score]])
  }, [score, turnScore])

  useEffect(() => {
    if (animation) {
      lottieRef.current?.play(startFrame, endFrame)
    }
  }, [animation])

  return (
    <BaseScreen headerShown={false}>
      <View style={styles.container}>
        <View>
          <Text className="uppercase font-balgin-narrow-bold text-20 text-center">
            Bravo ma star, tu as
          </Text>
          <Heading1 className="font-balgin-black text-56 text-center pb-24 pt-16">
            Gagné !
          </Heading1>
          <Text className="text-center">
            Plus que {CONSTANTS.maxPoints - score} paliers avant d’être une star
            !
          </Text>
        </View>

        {/* <View
          style={[
            styles.certifContainer,
            { transform: [{ translateY: -(certifHeight / 2) }] },
          ]}
        > */}
        {/* <Image style={styles.certifImage} source={require("../assets/certif/certif-01.png")} onLayout={handleOnLayout} /> */}
        { animation && <LottieView
          ref={lottieRef}
          source={animation}
          style={styles.lottieTransition}
          // autoPlay
          loop={false}
          // resizeMode="cover"
        /> }
        <View style={styles.point}>
          <Text className="text-32 font-balgin-narrow-bold uppercase text-center">
            {turnScore - score} point
          </Text>
        </View>
        {/* </View> */}

        <RoundedButton
          title={'Continuer'}
          onClick={() => router.push('/feed')}
        />
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
  },
  certifImage: {
    width: '100%',
    objectFit: 'contain',
    height: 190,
  },
  lottieTransition: {
    position: 'absolute',
    left: 0, 
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    pointerEvents: 'none',
  },
  point: {
    position: 'absolute',
    width: '100%',
    bottom: 180, 
    left: 0
  }
})
