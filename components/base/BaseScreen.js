import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Link, Stack, router, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default BaseScreen = ({ children, debug }) => {
  const insets = useSafeAreaInsets();
  const [devMode, setDevMode] = useState(false)

  enableDebug = () => {

  }

  useEffect(() => {
    setDevMode(debug)
  }, [debug])

  return (
    <View style={[styles.container, {paddingVertical: insets.top}]}>
      { devMode && <Link href='/debug'>Debug</Link>  }
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