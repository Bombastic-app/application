import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import BaseScreen from "../components/base/BaseScreen";
import Heading2 from "../components/typography/Heading2";
import Text from "../components/typography/Text";
import BackArrow from "../components/icons/BackArrow";
import { useRouter } from "expo-router";
import RulesDots from "../components/icons/RulesDots";
import Carousel from "react-native-reanimated-carousel";
import { useState } from "react";
import { Image } from "expo-image";
import { CONSTANTS } from "../constants";

export default Rules = ({ }) => {
  const width = Dimensions.get('window').width;
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const rulesData = [
    { title: "Décrocher la certification", text: "Tu incarnes un influenceur sur le réseau social Bombastic. Au cours de la partie, tu vas pouvoir récupérer des points. Au bout de 5, tu deviens le goat (le certifié), et c’est toi qui a gagné." },
    { title: "Les statistiques", text: "En tant qu’influenceur, tu dois surveiller ton nombre de followers, ton image et ta thune. Ces statistiques sont primordiales et te permettront d’obtenir un ou plusieurs points supplémentaires si c’est toi qui en a le plus parmi tous les joueurs." },
    { title: "Les cartes", text: "Dans ta main, tu auras toujours 5 cartes. Celles-ci te permettent d’effectuer diverses actions qui influenceront tes statistiques. Elles t’autoriseront à publier des photos, des tweets, ou bien des news. Mais fais bien attention aux conséquences de tes actions. Les pictogrammes de la carte t’indiqueront quelles statistiques elle cible." },
    { title: "Le feed", text: "Sur ton écran principal, le fil d’actualité des publications s’affichera. Tu pourras voir les posts de tous les joueurs, y compris les tiens, et y réagir en commentant et en likant. Enfin, seulement si t’es pas un bâtard." },
  ];

  const rulesImages = [
    require('../assets/rules/rule_1.png'),
    require('../assets/rules/rule_2.png'),
    require('../assets/rules/rule_3.png'),
    require('../assets/rules/rule_4.png'),
  ];

  const renderSlide = ({index}) => {
    return (
      <>
        <View className="items-center justify-center" style={styles.backgroundPicture}>
          <Image
            source={rulesImages[index]}
            contentFit="contain"
            cachePolicy={"memory-disk"}
            style={{ width: 270, height: 270 }}
          />
        </View>
        <View className="gap-20 items-center mt-50">
          <Heading2 className="pt-3">{rulesData[index].title}</Heading2>
          <Text className="text-center">{rulesData[index].text}</Text>
        </View>
      </>
    )
  };

  return (
    <BaseScreen>
      <Pressable onPress={router.back} className="self-start mb-40 mt-10">
        <BackArrow />
      </Pressable>

      <View className="relative flex-1">
        <View style={styles.fixBackgroundPicture}></View>
        <Carousel
          width={width - (CONSTANTS.paddingHorizontal * 2)}
          data={rulesData}
          loop={false}
          onSnapToItem={index => setCurrentIndex(index)}
          renderItem={renderSlide}
        />
      </View>

      <View className="items-center">
        <RulesDots active={currentIndex} />
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  backgroundPicture: {
    height: 350,
    borderRadius: 20,
  },
  fixBackgroundPicture: {
    backgroundColor: '#243042',
    height: 350,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});