import { Image } from "react-native-svg";
import { Image as ExpoImage } from "expo-image";
import ImageMask from "./icons/ImageMask";
import Animated from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import Star from "./icons/Star";

export default ShapedImage = ({ source }) => {
  return (
    <View style={styles.container}>
      <Animated.View />
      <Star style={{ position: "absolute", top: -30, left: 40, zIndex: 1 }} />
      <Star style={{ position: "absolute", top: 0, left: -15, zIndex: 1 }}/>
      <ImageMask>
        <Image
          width="100%"
          height="100%"
          href={source}
          preserveAspectRatio="xMidYMid slice"
          clipPath="#clip"
        />
      </ImageMask>
      <ExpoImage source={require('../assets/image-mask-bg.png')} style={styles.imgBg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  imgBg: {
    position: 'absolute',
    top: 14, 
    left: -9,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    zIndex: -1
  }
})