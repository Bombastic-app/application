import React, { useEffect, useRef, useState } from 'react'
import { Button, Pressable, ScrollView, View } from 'react-native'
import BaseScreen from '../components/base/BaseScreen'
import LogoSVG from '../components/icons/Logo'
import PlayerStatistics from '../components/feed/PlayerStatistics'
import Post from '../components/feed/Post'
import Heading5 from '../components/typography/Heading5'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import {
  updateFollowers,
  updateIsCurrentPlayer,
  updateMoney,
  updateNotification,
  updatePlayerId,
  updateReputation,
} from '../store'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CONSTANTS } from '../constants'

export default Feed = () => {
  const dispatch = useDispatch()
  const gameCode = useSelector((state) => state.gameCode)
  const playerId = useSelector((state) => state.playerId)
  const notification = useSelector((state) => state.notification)
  const currentTurn = useSelector((state) => state.currentTurn)
  const isCurrentPlayer = useSelector((state) => state.isCurrentPlayer)
  const insets = useSafeAreaInsets()

  const [posts, setPosts] = useState(false)
  const loadedData = useRef(false)

  loadDataOnce = () => {
    // dispatch(updateNotification(false))
    // dispatch(updateIsCurrentPlayer(false))

    firestore()
      .collection(`games/${gameCode}/players`)
      .doc(playerId)
      .onSnapshot((player) => {
        dispatch(updateNotification(false))
        dispatch(updateIsCurrentPlayer(false))

        if (player.data().current === true && player.data().reputation < 11 && player.data().money < 11 && player.data().followers < 11) {
          if (!notification) {
            console.log('show notif');
            setTimeout(() => {
              dispatch(updateNotification(true))
              dispatch(updateIsCurrentPlayer(true))
            }, 3000)
          }
        } else {
          dispatch(updateNotification(false))
          dispatch(updateIsCurrentPlayer(false))
        }

        if (player.data()?.money) {
          setTimeout(() => {
            dispatch(updateMoney(player.data().money))
          }, 2000)
        }

        if (player.data()?.reputation) {
          setTimeout(() => {
            dispatch(updateReputation(player.data().reputation))
          }, 2000)
        }

        if (player.data()?.followers) {
          setTimeout(() => {
            dispatch(updateFollowers(player.data().followers))
          }, 2000)
        }
      })

    // firestore()
    //   .collection(`games/${gameCode}/turns`)
    //   .doc(currentTurn.toString())
    //   .onSnapshot((doc) => {
    //     if (doc.exists) {
    //       if (doc.data().miniGameReady && !doc.data().winner) {
    //         setTimeout(() => {
    //           dispatch(updateFollowers(player.data().followers))
    //         }, 5000)
    //       }
    //     }
    //   })

    firestore()
      .collection(`games/${gameCode}/turns`)
      .doc(currentTurn.toString())
      .onSnapshot((doc) => {
        if (doc.exists) {
          if (doc.data().miniGameReady && !doc.data().winner) {
            setTimeout(() => {
              router.navigate('/vote')
            }, 7000)
          }
        }
      })

    loadedData.current = true
  }

  const handleOnClickPost = (
    author,
    pseudo,
    type,
    content,
    likes,
    dislikes
  ) => {
    router.push({
      pathname: '/post',
      params: { author, pseudo, type, content, currentTurn, likes, dislikes },
    })
  }

  useEffect(() => {
    if (!loadedData.current) loadDataOnce()
  }, [gameCode, currentTurn])

  useEffect(() => {
    if (currentTurn) {
      firestore()
        .collection(`games/${gameCode}/turns/${currentTurn}/posts`)
        .onSnapshot((docs) => {
          // console.log('new posts to add');
          const postsToAdd = []

          docs.forEach((doc) => {
            // console.log('doc', doc.data());
            postsToAdd.push(doc.data())
          })
          postsToAdd.sort((a, b) => b.timestamp - a.timestamp)
          setPosts(postsToAdd)
        })
    }
  }, [gameCode, playerId, currentTurn])

  return (
    <BaseScreen
      headerShown={false}
      style={{ paddingTop: insets.top, paddingBottom: 0, paddingHorizontal: 0 }}
    >
      <View className="gap-16 flex-1">
        <View style={{ paddingHorizontal: CONSTANTS.paddingHorizontal }}>
          <LogoSVG />
        </View>
        <PlayerStatistics />

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 110,
            paddingHorizontal: CONSTANTS.paddingHorizontal,
          }}
        >
          <View className="feed" style={{ gap: 10 }}>
            {posts &&
              posts.map((fPost, i) => {
                // console.log(i, fPost);
                return (
                  <Pressable
                    onPress={() =>
                      handleOnClickPost(
                        fPost.playerId,
                        fPost.pseudo,
                        fPost.type,
                        fPost.content,
                        fPost.likes,
                        fPost.dislikes
                      )
                    }
                    key={`feed-post-${i}`}
                  >
                    <Post
                      type={fPost.type}
                      content={fPost.content}
                      pseudo={fPost.pseudo}
                      author={fPost.playerId}
                      likes={fPost.likes}
                      dislikes={fPost.dislikes}
                      index={i}
                      reload={true}
                    />
                  </Pressable>
                )
              })}
          </View>
          {!posts ||
            (posts.length === 0 && (
              <View className="items-center justify-center flex-1">
                <Heading5 className="uppercase">
                  Ton feed est actuellement vide
                </Heading5>
              </View>
            ))}
        </ScrollView>
      </View>
    </BaseScreen>
  )
}
