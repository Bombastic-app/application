import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import firestore from "@react-native-firebase/firestore";

export default Debug = ({ navigation }) => {
  const [scannedCards, setScannedCard] = useState()

  firestore().collection('scannedCards').onSnapshot((snapshot) => {
    const oldScannedCards = scannedCards ?? []

    snapshot.forEach((card) => {
      oldScannedCards.push(card.data())
    })
    
    setScannedCard(oldScannedCards)
  })

  return (
    <View>
        <Text style={{ fontWeight: 'bold' }}>Scanned cards : </Text>
        { scannedCards && scannedCards.map((card, i) => {
          <Text key={i}>{ card.title }</Text>
        }) }
    </View>
  )
}