import React, { useState } from "react";
import BaseScreen from "../components/base/BaseScreen";
import Text from "../components/typography/Text";
import { RoundedButton } from "../components/base/RoundedButton";
import { Button, Image, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { CONSTANTS } from "../constants";
import { useSelector } from "react-redux";

export default Score = () => {
  const router = useRouter();
  const score = useSelector(state => state.score);

  const [ certifHeight, setCertifHeight] = useState(0);
  const handleOnLayout = (e) => {
    setCertifHeight(e.nativeEvent.layout.height);
  };

  return (
    <BaseScreen headerShown={false}>
      <View style={styles.container}>
        <View>
          <Text className="uppercase font-balgin-narrow-bold text-18 text-center">Bravo, tu as</Text>
          <Text className="font-balgin-black text-56 text-center pb-24 pt-16">Gagné !</Text>
          <Text className="text-center">Plus que {CONSTANTS.maxPoints - score} paliers avant d’être une star !</Text>
        </View>

        <View style={[styles.certifContainer, {transform: [{translateY: -(certifHeight / 2)}],}]}>
          <Image style={styles.certifImage} source={require("../assets/certif.png")} onLayout={handleOnLayout} />

            <View className="absolute bottom-0 translate-y-60">
              <Text className="text-32 font-balgin-narrow-bold uppercase">{score} point</Text>
            </View>
        </View>

        <RoundedButton
          title={"Continuer"}
          onClick={() =>
            router.push("/feed")
          }
        />
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: 'center',
    paddingTop: 48
  },
  certifContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  certifImage: {
    width: '100%',
    objectFit: 'contain',
    height: 190
  }
});