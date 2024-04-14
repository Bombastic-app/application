import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { onValue, push, ref, set, update } from "firebase/database";
import { RoundedButton } from "../../components/base/RoundedButton";
import firestore from "@react-native-firebase/firestore";

export default NewGame = () => {
  const [gameCode, setGameCode] = useState("");
  const { pseudo } = useLocalSearchParams();
  const [players, setPlayers] = useState();
  const [screen, setScreen] = useState(false)  

  runGame = async () => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/run_game`, { 
      method: 'get',
      'Content-Type': 'application/json'
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
  }

  useEffect(() => {
    // ref.current = ref(db, "groups");
    setGameCode("123456");
  }, []);

  useEffect(() => {
    if (gameCode !== "") {
      const updates = {};
      updates[`/groups/${gameCode}/${pseudo}`] = {
        isMain: true,
      };
      
      firestore().collection('groups').doc(gameCode).get()
      .then((group) => {
        console.log(group.data())
      })

      firestore().collection(`groups/123456/games/XOnB0bKnYoL8bAoyzG8C/players`).doc('Lmy34r3iRMJkUYBORz2Q')
      .onSnapshot((player) => {
        console.log(player.data());
        setScreen(player.data().screen)
      })
      
      // update(ref(db), updates);

      // groupRef.current = ref(db, `groups/${gameCode}`);
      // onValue(groupRef.current, (snapshot) => {
      //   const data = snapshot.val();
      //   setPlayers(data);
      // });
    }
  }, [gameCode]);

  return (
    <View style={{ padding: 20, alignItems: "center", rowGap: 16 }}>
      <View>
        <Stack.Screen
          options={{
            title: "Créer une partie",
            headerStyle: { backgroundColor: "darkblue" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Code de partie</Text>
        <Text style={{ fontSize: 24, fontWeight: "600", textAlign: "center" }}>
          {gameCode}
        </Text>
      </View>
      <View style={{ rowGap: 8, flexDirection: "column" }}>
        {players &&
          Object.keys(players).map((pseudo, i) => (
            <Text
              key={i}
              style={{
                padding: 14,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 16,
                width: "100%",
              }}>
              {pseudo}
            </Text>
          ))}
      </View>
      <RoundedButton
        title={"Lancer la partie"}
        // onClick={() =>
        //   router.push({
        //     pathname: "/setup/profile_picture"
        //   })
        // }
        onClick={runGame}
      />
      { screen && <Text>coucou { screen }</Text> }
    </View>
  );
};
