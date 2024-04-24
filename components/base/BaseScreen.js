import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Link, Stack, router, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import firestore from '@react-native-firebase/firestore'
import { globalStyles } from "../Style";
import { StatusBar } from "expo-status-bar";
import Alert from "../notifications/Alert";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert, updateNotification } from "../../store";
import Notification from "../notifications/Notification";

export default BaseScreen = ({ children, title, debug, className, headerShown = false }) => {
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
    <View className={`relative bg-marine w-full h-full ${className}`} style={[styles.container, {paddingVertical: insets.top }]}>
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
    paddingHorizontal: 20,
    flex: 1,
    position: "relative",
  },
});