import { StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import BaseScreen from '../../../components/base/BaseScreen'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../../../components/Style'
import CardTitle from '../../../components/turn/CardTitle'
import { Image } from 'expo-image'

export default Start = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.navigate('/mini-game/meme')
    }, 4000)
  }, [])

  return (
    <BaseScreen headerShown={false}>
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
        colors={[colors.blue, colors.purple, colors.pink]}
      />
      <View
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {true && (
          <Image
            style={{ position: 'relative', width: '100%', height: '100%' }}
            contentFit="cover"
            source={require('../../../assets/memes.gif')}
          />
        )}
      </View>
      <View className="flex-1 item-center justify-center" style={{ zIndex: 10 }}>
        <CardTitle title="Deviens une ref" />
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
