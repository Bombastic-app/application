import { Button, Text, TouchableHighlight, View } from "react-native";

export const RoundedButton = ({ title, onClick }) => {
  return (
    <TouchableHighlight className="px-10" onPress={onClick}>
      <View className="flex items-center w-full py-24 bg-beige rounded-full">
        <Text className="text-marine uppercase font-balgin-narrow-bold text-16">
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
