import { useEffect } from "react"
import { persistor, updateCurrentTurn, updateFollowers, updateMoney, updatePlayerId, updateReputation, updateScore } from "../../store"
import firestore from '@react-native-firebase/firestore'
import { useDispatch } from "react-redux"

export default Reset = ({ gameCode = false, playerId = false }) => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    persistor.flush().then(() => {
      console.info('Purge store...')
      return persistor.purge()
    }).then(() => {
      if (gameCode && playerId) {
        console.info('Game code & player ID detected, fetch data from Firestore...')
        firestore().collection(`games/${gameCode}/players`).doc(`${playerId}`).get().then((player) => {
          const data = player.data()

          dispatch(updateCurrentTurn(1))
          dispatch(updateGameCode(gameCode))
          dispatch(updatePlayerId(playerId))
          dispatch(updateScore(data.score))
          dispatch(updateMoney(data.money))
          dispatch(updateReputation(data.reputation))
          dispatch(updateFollowers(data.followers))
        }).then(() => {
          console.info('Data set')
        })
      }
      
    })
  }, [])
}