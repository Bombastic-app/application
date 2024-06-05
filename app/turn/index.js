import { useEffect, useRef, useState } from "react"
import YourTurn from "../../pages/YourTurn"
import LottieView from "lottie-react-native"
import { StyleSheet } from "react-native"
import TweetToFill from "../../pages/TweetToFill"

export default TurnPage = ({ navigation }) => {
  const [status, setStatus] = useState(0)
  const [startTransition, setStartTransition] = useState(false)
  const [endTransition, setEndTransition] = useState(false)
  const [cardData, setCardData] = useState(false)

  const startTransitionRef = useRef(null)
  const endTransitionRef = useRef(null)

  const startTransitions = {
    tweet: require("../../assets/transitions/scan/start/transition-blue.json"),
    photo: require("../../assets/transitions/scan/start/transition-pink.json"),
    news: require("../../assets/transitions/scan/start/transition-purple.json"),
    event: require("../../assets/transitions/scan/start/transition-marine.json"),
  }

  const endTransitions = {
    tweet: require("../../assets/transitions/scan/end/transition-blue.json"),
    photo: require("../../assets/transitions/scan/end/transition-pink.json"),
    news: require("../../assets/transitions/scan/end/transition-purple.json"),
    event: require("../../assets/transitions/scan/end/transition-marine.json"),
  }

  const handleStatus = (newStatus) => {
    setStatus(newStatus)
  }
  const handleStartTransition = (transitionType) => {
    setStartTransition(transitionType)
  }
  const handleEndTransition = (transitionType) => {
    setEndTransition(transitionType)
  }
  const handleCardData = (data) => {
    setCardData(data)
  }
  const startTransitionPlay = () => {
    startTransitionRef.current?.play()
  }
  const endTransitionPlay = () => {
    endTransitionRef.current?.play()
    console.log("end transition playing")
  }

  return (
    <>
      {startTransition && (
        <LottieView
          ref={startTransitionRef}
          source={startTransitions[startTransition]}
          style={styles.lottieTransition}
          speed={0.5}
          resizeMode="cover"
          loop={false}
        />
      )}
      {endTransition && (
        <LottieView
          ref={endTransitionRef}
          source={endTransitions[endTransition]}
          style={styles.lottieTransition}
          speed={0.5}
          resizeMode="cover"
          loop={false}
        />
      )}
      {status === 0 && (
        <YourTurn
          handleStatus={handleStatus}
          handleStartTransition={handleStartTransition}
          handleCardData={handleCardData}
          handleEndTransition={handleEndTransition}
          startTransitionPlay={startTransitionPlay}
          endTransitionPlay={endTransitionPlay}
        />
      )}
      { status === 1 && <TweetToFill type={cardData.type} content={cardData.content} /> }
      { status === 2 && <PhotoToFill type={cardData.type} content={cardData.content} title={cardData.title} /> }
    </>
  )
}

const styles = StyleSheet.create({
  lottieTransition: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 100,
    pointerEvents: "none",
  },
})
