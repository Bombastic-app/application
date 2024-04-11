import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default BaseScreen = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingVertical: insets.top}]}>
      <Stack.Screen
        options={{
          title: "Lobby",
        }}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
});