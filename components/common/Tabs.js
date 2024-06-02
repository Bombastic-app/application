import { StyleSheet, View } from "react-native"
import Tab from "../tabs/Tab"
import { Path, Svg } from "react-native-svg"
import FeedButtonBackground from "../icons/FeedButtonBackground"
import ProfileButtonBackground from "../icons/ProfileButtonBackground"
import Home from "../icons/Home"
import Profile from "../icons/Profile"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"

export default Tabs = ({ active, handleActive }) => {
  const insets = useSafeAreaInsets();

  const handleOnClickFeed = () => {
    if (active !== 'feed') {
      handleActive('feed');
    }
  }

  const handleOnClickProfile = () => {
    if (active !== 'profile') {
      handleActive('profile');
    }
  }

  return (
    <View style={styles.tabs}>
      <LinearGradient style={styles.gradient} colors={['transparent', '#0C1A2D']} locations={[0.01, 1]}></LinearGradient>

      <View className="relative self-center" style={{ marginBottom: insets.bottom }}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="261"
          height="60"
          fill="none"
          viewBox="0 0 261 60"
        >
          <Path
            fill="#243042"
            d="M250.222.644L9.497 12.768A10 10 0 000 22.756V50c0 5.523 4.477 10 10 10h233.004a10 10 0 009.813-8.076l7.721-39.369c1.251-6.38-3.823-12.238-10.316-11.911z"
          ></Path>
        </Svg>

        <View style={styles.container}>
          <Tab active={active == 'feed' ? true : false} title="Feed" Logo={Home} Background={FeedButtonBackground} bottom={10} onClick={handleOnClickFeed} />
          <Tab active={active == 'profile' ? true : false} title="Profil" Logo={Profile} Background={ProfileButtonBackground} bottom={13} onClick={handleOnClickProfile} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabs: {
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    alignSelf: 'center',
    width: '100%',
  },
  container: {
    position: 'absolute',
    left: 3,
    bottom: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 0,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    height: 100,
    pointerEvents: 'none',
  }
});