import { View } from "react-native"
import Heading3 from "../typography/Heading3"
import Text from "../typography/Text"

export default Notification = () => {
  return <View className="absolute top-60 w-full py-30 px-10 flex flex-col gap-y-15 rounded-30 bg-white self-center z-10">
    <Heading3 className={'text-center !text-marine uppercase'}>C'est ton tour !</Heading3>
    <Text className={'text-center !text-marine'}>Choisis une carte de ton jeu et scanne-là pour l’activer</Text>
  </View>
} 