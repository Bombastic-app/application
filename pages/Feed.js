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
  updateMoney,
  updateNotification,
  updatePlayerId,
  updateReputation,
} from '../store'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default Feed = () => {
  const dispatch = useDispatch()
  const gameCode = useSelector((state) => state.gameCode)
  const playerId = useSelector((state) => state.playerId)
  const notification = useSelector((state) => state.notification)
  const currentTurn = useSelector((state) => state.currentTurn)
  const insets = useSafeAreaInsets();

  const [posts, setPosts] = useState(false)
  const loadedData = useRef(false)

  loadDataOnce = () => {
    dispatch(updateNotification(false))

    firestore()
      .collection(`games/${gameCode}/players`)
      .doc(playerId)
      .onSnapshot((player) => {
        if (player.data()?.current) {
          if (!notification) {
            setTimeout(() => {
              dispatch(updateNotification(true))
            }, 3000)
          }
          loadedData.current = true
        } else {
          dispatch(updateNotification(false))
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

    firestore()
      .collection(`games/${gameCode}/turns`)
      .doc(currentTurn.toString())
      .onSnapshot((doc) => {
        if (doc.exists) {
          if (doc.data().miniGameReady && !doc.data().winner) {
            setTimeout(() => {
              router.navigate('/vote')
            }, 5000)
          }
        }
      })
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
          const postsToAdd = []

          docs.forEach((doc) => {
            postsToAdd.push(doc.data())
          })

          setPosts(postsToAdd)
        })
    }
  }, [gameCode, playerId, currentTurn])

  return (
    <BaseScreen headerShown={false} style={{ paddingTop: insets.top, paddingBottom: 0 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {/* <Image
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          source={require('../assets/money_1.gif')}
        /> */}
      </View>
      <View className="gap-16 flex-1">
        <LogoSVG />
        <PlayerStatistics />

        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 110 }}>
          <View className="feed" style={{ gap: 10 }}>
            {posts &&
              posts
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((fPost, i) => {
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
