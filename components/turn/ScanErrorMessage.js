import { View } from "react-native"
import Heading2 from "../typography/Heading2"
import { RoundedButton } from "../base/RoundedButton"

export default ScanErrorMessage = ({ title, handleOnRetry }) => {
  return (
    <View className="flex flex-col gap-y-30 w-full">
      <Heading2 className="text-center">{title}</Heading2>
      <RoundedButton title="Réessayer" onClick={handleOnRetry} />
    </View>
  )
}