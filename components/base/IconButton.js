import { Image, Text, View } from "react-native";

export default IconButton = ({ type, title }) => {
  let picto;
  switch (type) {
    case "reputation":
      picto = require("../../assets/picto/reputation.png");
      break;
    case "followers":
      picto = require("../../assets/picto/followers.png");
      break;
    case "money":
      picto = require("../../assets/picto/money.png");
      break;
    default:
      break;
  }

  return (
    <View className="flex flex-col gap-y-10 items-center">
      <View className="bg-white/10 rounded-12 p-13">
        <Image className="w-24 h-24" source={picto} />
      </View>
      <Text className=" text-white font-libre-franklin font-bold text-12">{ title }</Text>
    </View>
  );
};
