import React, { useEffect, useState } from "react";
import BaseScreen from "../components/base/BaseScreen";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import Text from "../components/typography/Text";
import { Button } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { updateNotification } from "../store";

export default YourTurn = () => {
  const router = useRouter();
  const [tagId, setTagId] = useState('');
  const [cardData, setCardData] = useState({});
  const [scanError, setScanError] = useState(false);
  const dispatch = useDispatch()

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.NfcA);
      // the resolved tag object will contain `ndefMessage` property
      await NfcManager.getTag().then((tag) => {
        console.warn("Tag found", tag);
        setTagId(tag.id)
      });
    } catch (ex) {
      console.log("Oops!", ex);
      setScanError(true);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  useEffect(() => {
    if (tagId !== '') {
      console.log(tagId);
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/card/${tagId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setCardData(data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [tagId]);

  useEffect(() => {
    setTimeout(() => {
      readNdef();
      dispatch(updateNotification(false))
    }, 1000);
  }, []);

  handleOnPlay = () => {
    console.log('Playing card', cardData);
    router.push({ pathname: "/tweet", params: { type: cardData.type, content: cardData.content } })
  };

  return (
    <BaseScreen headerShown={false}>
      {/* If nothing scanned yet */}
      {tagId == '' && !scanError && <Text>C'est ton tour ! Scanne la carte de ton choix.</Text>}

      {/* If scan failed */}
      {scanError && tagId == '' &&
        <>
          <Text>Le scan n'a pas fonctionné.</Text>
          <Button title="Réessayer" onPress={readNdef} />
        </>
      }

      {/* If scanned cart isn't found */}
      {tagId && !cardData.title &&
        <>
          <Text>Cette carte n'est pas reconnue.</Text>
          <Button title="Réessayer" onPress={readNdef} />
        </>
      }

      {/* If scanned card found */}
      {tagId && cardData.title && 
        <>
          <Text>{cardData.title}</Text>
          <Button title="Confirmer cette action" onPress={handleOnPlay} />
          <Button title="Scanner une autre carte" onPress={readNdef} />
        </>
      }
    </BaseScreen>
  );
};