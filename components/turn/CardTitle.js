import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { gsap } from "gsap-rn";
import Text from "../typography/Text";
import Star from "../icons/Star";
import { colors } from "../Style";

export default CardTitle = ({ title }) => {
  const [titleSize, setTitleSize] = useState(80);
  const titleRef = useRef();

  const sizes = {
    5: 170,
    6: 142,
    7: 122,
    8: 106,
    9: 92,
    10: 86,
    11: 80,
  };

  useEffect(() => {
    if (title) {
      gsap.fromTo(
        titleRef.current,
        { transform: { scale: 0.01 } },
        {
          transform: { scale: 1, rotate: -15 },
          duration: 0.8,
          ease: "elastic.out",
          delay: 1,
        }
      );
    }
  }, [title]);

  const handleTextLayout = (event) => {
    if (event.nativeEvent.lines[0]) {
      const lineLength = event.nativeEvent.lines[0].text.length;
      setTitleSize(sizes[lineLength]);
    }
  };

  return (
    <View >
      <Text
        ref={titleRef}
        onTextLayout={handleTextLayout}
        style={[styles.cardTitle, { fontSize: titleSize }]}
        className="font-balgin-black-italic uppercase">
        {title}
      </Text>
      <Star fill={ colors.beige } />
      <Star fill={ colors.beige } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },  
  cardTitle: {
    marginLeft: -40,
    marginRight: -40,
    width: "130%",
    textAlign: "center",
  },
});
