import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { gsap } from "gsap-rn";
import Text from "../typography/Text";
import Star from "../icons/Star";
import { colors } from "../Style";
import { Image } from "expo-image";

export default CardTitle = ({ title, reset }) => {
  const [titleSize, setTitleSize] = useState(80);
  const titleRef = useRef();
  const firstStarRef = useRef();
  const secondStarRef = useRef();
  const lightsRef = useRef();

  const sizes = {
    5: 170,
    6: 142,
    7: 122,
    8: 106,
    9: 92,
    10: 86,
  };

  useEffect(() => {
    if (reset) setTitleSize(80);
  }, [reset]);

  useEffect(() => {
    if (title) {
      gsap
        .timeline()
        .fromTo(
          lightsRef.current,
          { transform: { scale: 0.01 } },
          { transform: { scale: 2 }, duration: 0.8, ease: "elastic.out"},
          0.2
        )
        .fromTo(
          titleRef.current,
          { transform: { scale: 0.01 } },
          {
            transform: { scale: 1, rotate: -15 },
            duration: 0.8,
            ease: "elastic.out",
          },
          0.3
        )
        .fromTo(
          firstStarRef.current,
          { transform: { scale: 0.01 }, style: { alpha: 0 } },
          {
            transform: { scale: 0.85, rotate: 15 },
            style: { alpha: 1 },
            duration: 0.6,
            ease: "elastic.out",
          },
          "<0.2"
        )
        .fromTo(
          secondStarRef.current,
          { transform: { scale: 0.01 }, style: { alpha: 0 } },
          {
            transform: { scale: 0.5, rotate: 15 },
            style: { alpha: 1 },
            duration: 0.6,
            ease: "elastic.out",
          },
          "<0.2"
        )
    }
  }, [title]);

  const handleTextLayout = (event) => {
    if (event.nativeEvent.lines[0]) {
      const length = event.nativeEvent.lines[0].text.length;

      if (length > 10) setTitleSize(80);
      else setTitleSize(sizes[length]);
    }
  };

  return (
    <View style={{ overflow: 'visible' }}>
      <Text
        ref={titleRef}
        onTextLayout={handleTextLayout}
        style={[styles.cardTitle, { fontSize: titleSize }]}
        className="font-balgin-black-italic uppercase">
        {title}
      </Text>
      <Star
        ref={firstStarRef}
        fill={colors.white}
        style={{ position: "absolute", top: -50, left: 80 }}
      />
      <Star
        ref={secondStarRef}
        fill={colors.white}
        style={{ position: "absolute", top: -80, left: 130 }}
      />
      <View ref={lightsRef} style={styles.lightsImage}>
      <Image
        source={require("../../assets/lights.png")}
        style={{ width: '100%', height: '100%', objectFit: 'cover', overflow: 'visible' }}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  cardTitle: {
    marginLeft: -40,
    marginRight: -40,
    width: "130%",
    textAlign: "center",
  },
  starSvg: {
    position: "absolute",
    top: -50,
    left: 80,
  },
  lightsImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0, 
    left: 0,
    opacity: 0.2,
    overflow: 'visible'
  },
});
