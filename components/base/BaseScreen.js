import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Link, Stack, router, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import firestore from '@react-native-firebase/firestore'
import { globalStyles } from "../Style";

export default BaseScreen = ({ children, title, debug }) => {
  const insets = useSafeAreaInsets();
  const [devMode, setDevMode] = useState(false)

  enableDebug = () => {

  }

  useEffect(() => {
    setDevMode(debug)
  }, [debug])

  return (
    <View style={[styles.container, globalStyles.bgPrimary, {paddingVertical: insets.top}]}>
      { devMode && <Link href='/debug'>Debug</Link>  }
      <Stack.Screen options={{ title }} />
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