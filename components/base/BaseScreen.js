import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Link, Stack, router, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import firestore from '@react-native-firebase/firestore'
import { globalStyles } from "../Style";
import { StatusBar } from "expo-status-bar";

export default BaseScreen = ({ children, title, debug, className, headerShown = true }) => {
  const insets = useSafeAreaInsets();
  const [devMode, setDevMode] = useState(false)

  enableDebug = () => {

  }

  useEffect(() => {
    setDevMode(debug)
  }, [debug])

  return (
    <View className={`bg-marine ${className}`} style={[styles.container, {paddingVertical: insets.top}]}>
      { devMode && <Link className="text-beige" href='/debug'>Debug</Link>  }
      <StatusBar style="light" />
      <Stack.Screen options={{ title, headerShown }} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    position: "relative",
  },
});