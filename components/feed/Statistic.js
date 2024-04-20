import { Image, StyleSheet, View } from "react-native"
import Text from "../typography/Text"
import ProgressCircle from "./ProgressCircle"

export default Statistic = ({ progress, data, type }) => {
  let picto;
  switch (type) {
    case 'reputation':
      picto = require('../../assets/picto/reputation.png');
      break;
    case 'followers':
      picto = require('../../assets/picto/followers.png');
      break;
    case 'money':
      picto = require('../../assets/picto/money.png');
      break;
    default:
      break;
  }

  return (
    <View className="flex-row items-center gap-7 relative">
      <ProgressCircle progress={progress} />
      <Image style={styles.picto} source={picto} />
      <Text>{data}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  picto: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 0,
    top: 0,
    transform: [
      {translateX: 24},
      {translateY: 24}
    ]
  }
});