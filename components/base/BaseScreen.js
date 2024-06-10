import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import firestore from '@react-native-firebase/firestore'
import { colors } from "../Style";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { updateAlert } from "../../store";
import Notification from "../notifications/Notification";
import { CONSTANTS } from "../../constants";

export default BaseScreen = ({ children, title, debug, className, headerShown = false, style }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch()
  const [devMode, setDevMode] = useState(false)

  handleOnUpdateAlert = () => {
    dispatch(updateAlert("Ton tour dans 5 secondes"));
  };

  useEffect(() => {
    setDevMode(debug)
  }, [debug])

  return (
    <View className={`relative bg-marine w-full h-full ${className}`} style={[styles.container, {paddingVertical: insets.top }, style]}>
      <Notification />
      { devMode && <Link className="text-white" href='/debug'>Debug</Link>  }
      <StatusBar style="light" />
      <Stack.Screen options={{ title, headerShown }} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: CONSTANTS.paddingHorizontal,
    flex: 1,
    position: "relative",
    backgroundColor: colors.marine
  },
});