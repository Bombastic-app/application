import { Share, TouchableHighlight, View } from 'react-native'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { RoundedButton } from '../../components/base/RoundedButton'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import BaseScreen from '../../components/base/BaseScreen'
import Cards from '../../components/icons/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'expo-image'
import { updateCurrentTurn, updateProfilePictures } from '../../store'
import Text from '../../components/typography/Text'
import Heading1 from '../../components/typography/Heading1'
import Heading4 from '../../components/typography/Heading4'
import ShapedImage from '../../components/ShapedImage'

export default NewGame = () => {
  const gameCode = useSelector((state) => state.gameCode)
  const currentTurn = useSelector((state) => state.currentTurn)
  const dispatch = useDispatch()
  const [players, setPlayers] = useState(false)
  const [pictures, setPictures] = useState([])

  const shareLink = async () => {
    Share.share({
      message: 'Partage le lien de la partie avec tes amis !',
    }).then((result) => {
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    })
  }

  const onStartGame = () => {
    if (!currentTurn) {
      dispatch(updateCurrentTurn(1))
      dispatch(updateProfilePictures(pictures))
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/game/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameCode }),
      })
        .then((res) => res.json())
        .then((res) => {
          router.navigate('/feed')
        })
    }
  }

  useEffect(() => {
    if (players) {
      players.forEach((player) => {
        if (!players.some((e) => e.name === player.id)) {
          storage()
            .ref()
            .child(`/games/${gameCode}/profile_pictures/${player.id}.png`)
            .getDownloadURL()
            .then((url) => {
              const picture = {
                name: player.id,
                url: url,
              }

              setPictures((oldPictures) => [...oldPictures, picture])
            })

          // getBlob().then(() => {
          //   console.log('coucou')
          // })
        }
      })
    }
  }, [players])

  useEffect(() => {
    if (gameCode) {
      firestore()
        .collection(`games/${gameCode}/players`)
        .onSnapshot((players) => {
          if (!players.empty)
            setPlayers(
              players.docs.map((player) => {
                return { ...player.data(), id: player.id }
              })
            )
        })
    }
  }, [gameCode])

  return (
    <BaseScreen className="flex flex-col h-screen justify-between w-full bg-marine">
      <View>
        <View className="flex flex-col items-center gap-y-10">
          <Text className="font-balgin-narrow-bold text-16 uppercase">
            Code de partie
          </Text>

          <Heading1>{gameCode}</Heading1>
        </View>
      </View>

      {players && (
        <View className="flex flex-row justify-center items-start flex-wrap gap-x-60 gap-y-30 px-10">
          {players.map((player, i) => {
            if (pictures.find((np) => np.name === player.id)) {
              return (
                <View
                  className="flex flex-col items-center gap-y-10"
                  style={
                    i % 2 == 1
                      ? { transform: [{ translateY: 24 }] }
                      : { transform: [{ translateY: 0 }] }
                  }
                  key={`player-${i}`}
                >
                  <View className="relative">
                    {pictures && (
                      <ShapedImage
                        source={
                          pictures.find((np) => np.name === player.id)?.url
                        }
                        animation={false}
                        showStars={false}
                        hasGradient={false}
                        isSlim
                        isSlimSmall
                      />
                    )}
                    <View className="absolute right-[-2] bottom-[-10] w-[20] h-[20] bg-[green] rounded-full border-4 border-marine"></View>
                  </View>
                  <Text className="uppercase font-balgin-black-italic">
                    @<Text>{player.pseudo}</Text>
                  </Text>
                </View>
              )
            }
          })}
        </View>
      )}

      <View className="flex flex-col gap-y-16 bottom-[-20]">
        <View className="flex flex-col items-center gap-y-16 w-full bg-white/10 p-24 rounded-12">
          <Cards />
          <Text className="text-white text-16 font-balgin-narrow-bold uppercase text-center">
            Distribuez 5 cartes action par joueur avant de démarrer.
          </Text>
        </View>
        <TouchableHighlight className="self-center" onPress={shareLink}>
          <View className="pb-7 border-b-2 border-b-white">
            <Heading4 className="uppercase">Partager le lien</Heading4>
          </View>
        </TouchableHighlight>
        <RoundedButton title={'Démarrer'} onClick={onStartGame} gradient />
      </View>
    </BaseScreen>
  )
}
