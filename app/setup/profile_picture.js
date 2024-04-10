import { Image, StyleSheet, Text, View } from "react-native"
import { RoundedButton } from "../../components/RoundedButton"
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

export default NewGame = () => {
  const [image, setImage] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => { 
    if (!status.granted) requestPermission()

    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return <View style={{ flexDirection: 'column', rowGap: 16 }}>
    <Text>Ajoute une photo de profil</Text>
    <RoundedButton title='Prendre une photo' onClick={takePicture} />
    <RoundedButton title='Sélectionner une photo' onClick={pickImage} />
    {image && <Image source={{ uri: image }} style={styles.image} />}
  </View>
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});