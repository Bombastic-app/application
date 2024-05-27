import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native"

export default Tab = ({ Logo, Background, title, onClick, bottom, active = false }) => {
  const [layoutWidth, setLayoutWidth] = useState(0);

  const handleOnLayout = (e) => {
    setLayoutWidth(e.nativeEvent.layout.width);
  };

  return (
    <Pressable onPress={onClick}>
      <Background style={{opacity: active ? 1 : 0}} />
      <View onLayout={handleOnLayout} style={[styles.content, { bottom, transform: [{translateX: -layoutWidth/2}], opacity: active ? 1 : 0.5 }]}>
        <Logo />
        <Text className="font-bold">{title}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
  },
});