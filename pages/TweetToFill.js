import BaseScreen from "../components/base/BaseScreen"
import Text from "../components/typography/Text"

export default TweetToFill = ({ type, content }) => {
  return (
    <BaseScreen headerShown={false}>
      <Text>{type}</Text>
      <Text>{content}</Text>
    </BaseScreen>
  )
}