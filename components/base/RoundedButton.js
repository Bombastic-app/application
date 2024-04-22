import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, Touchable, TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedback, View } from "react-native";
import { colors } from "../Style";

export const RoundedButton = ({ title, onClick, rotateRight, rotateLeft, gradient }) => {
  const [rotation, setRotation] = useState('0deg')

  useEffect(() => {
    if (rotateLeft) setRotation('4deg')
  }, [rotateLeft])

  useEffect(() => {
    if (rotateRight) setRotation('-4deg')
  }, [rotateRight])

  return (
    <TouchableNativeFeedback onPress={onClick}>
      <View className="relative flex items-center w-full py-24 my-5 bg-white rounded-full overflow-hidden"  style={{ transform: `rotate(${rotation})` }}>
        { gradient && <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={ styles.gradient } colors={[ colors.blue, colors.purple, colors.pink ]} /> }
        <Text className={`${gradient ? 'text-white' : 'text-marine' } uppercase font-balgin-narrow-bold text-16`}>
          {title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0, 
    left: 0,
    width: '100%',
    height: 100,
  }
})
