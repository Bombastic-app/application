import { Pressable, StyleSheet, View } from 'react-native'
import BaseScreen from '../components/base/BaseScreen'
import TopStatTitle from '../components/turn/TopStatTitle'
import Heading5 from '../components/typography/Heading5'
import { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { router } from 'expo-router'
import { upgradeTurnScore } from '../store'

export default TopStat = () => {
  const gameCode = useSelector((state) => state.gameCode)
  const currentTurn = useSelector((state) => state.currentTurn)
  const turnScore = useSelector((state) => state.turnScore)
  const playerId = useSelector((state) => state.playerId)
  const score = useSelector((state) => state.currentTurn)
  const [nextSizes, setNextSizes] = useState({ width: 0, height: 0 })
  const [status, setStatus] = useState(0)
  const [players, setPlayers] = useState(false)
  const dispatch = useDispatch()

  const titles = {
    reputation: 'Le nouveau Squeezie',
    money: "L'influenceur Dubaï",
    followers: 'La putaclic',
  }

  const handleOnLayout = (e) => {
    setNextSizes({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    })
  }

  const updateStatus = () => {
    if (status === 2) {
      Object.values(players).forEach((player) => {
        if (player === playerId) dispatch(upgradeTurnScore())
      })
      router.push('/score')
    } else setStatus(status + 1)
  }

  useEffect(() => {
    setStatus(0)
  }, [players])

  useEffect(() => {
    // Set titles via API
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/game/setTitles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameCode }),
    })

    // Listen for changes
    firestore()
      .collection(`games/${gameCode}/turns`)
      .doc('1')
      .onSnapshot((turn) => {
        const data = turn.data()

        setPlayers({
          reputation: data.reputation,
          money: data.money,
          followers: data.followers,
        })
      })
  }, [])

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
      {players && (
        <>
          {status === 0 && (
            <TopStatTitle
              title={titles['money']}
              type="money"
              player={players['money']}
            />
          )}
          {status === 1 && (
            <TopStatTitle
              title={titles['reputation']}
              type="reputation"
              player={players['reputation']}
            />
          )}
          {status === 2 && (
            <TopStatTitle
              title={titles['followers']}
              type={'followers'}
              player={players['followers']}
            />
          )}
        </>
      )}

      <View
        style={[
          styles.nextButton,
          { left: '55%', transform: [{ translateX: -(nextSizes.width / 2) }] },
        ]}
        onLayout={handleOnLayout}
      >
        <Pressable onPress={updateStatus}>
          <Heading5 className={'uppercase'}>Toucher pour continuer</Heading5>
        </Pressable>
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  nextButton: {
    position: 'absolute',
    bottom: 50,
    textAlign: 'center',
    zIndex: 3,
  },
})
