import { Button, Text, TouchableHighlight, View } from "react-native";

export const RoundedButton = ({ title, onClick }) => {
  return (
    <TouchableHighlight onPress={onClick}>
      <View
        style={{ backgroundColor: "darkblue", padding: 14, borderRadius: 100 }}
        o>
        <Text
          style={{
            fontSize: 21,
            color: "white",
            fontWeight: "600",
            textAlign: "center",
          }}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
