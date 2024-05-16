import { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

export default CardTitle = ({ title }) => {
  const [titleSize, setTitleSize] = useState(80);

  const sizes = {
    5: 170,
    6: 142,
    7: 122,
    8: 106,
    9: 92,
    10: 86,
    11: 80,
  };

  const handleTextLayout = (event) => {
    if (event.nativeEvent.lines[0]) {
      const lineLength = event.nativeEvent.lines[0].text.length;
      setTitleSize(sizes[lineLength]);
    }
  };

  return (
    <Text
      onTextLayout={handleTextLayout}
      style={[styles.cardTitle, { fontSize: titleSize }]}
      className="font-balgin-black-italic uppercase">
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    transform: [{ rotate: '-15deg' }],
    marginLeft: -40,
    marginRight: -40,
    width: '130%',
    textAlign: 'center',
  },
});