import { Image, StyleSheet, View } from "react-native"
import ProgressCircle from "./ProgressCircle"
import Heading5 from "../typography/Heading5";

export default Statistic = ({ data, type }) => {
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
    <View className="flex-row items-center gap-5 relative">
      <ProgressCircle progress={data} />
      <Image style={styles.picto} source={picto} />
      <Text>
        <Heading5 style={styles.number}>{data}</Heading5>
        <Heading5>{type == 'reputation' ? '%' : 'M'}</Heading5>
      </Text>
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
  },
  number: {
    fontVariant: ['tabular-nums'],
    fontFamily: 'Libre Franklin',
  },
});