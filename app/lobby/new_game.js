import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { onValue, push, ref, set, update } from "firebase/database";
import { db } from "../../firebaseConfig";

export default NewGame = () => {
  const [gameCode, setGameCode] = useState("");
  const groupsRef = useRef();
  const groupRef = useRef();
  const { pseudo } = useLocalSearchParams();
  const [players, setPlayers] = useState();

  useEffect(() => {
    ref.current = ref(db, "groups");
    setGameCode("123456");
  }, []);

  useEffect(() => {
    if (gameCode !== "") {
      const updates = {};
      updates[`/groups/${gameCode}/${pseudo}`] = {
        isMain: true,
      };
      update(ref(db), updates);

      groupRef.current = ref(db, `groups/${gameCode}`);
      onValue(groupRef.current, (snapshot) => {
        const data = snapshot.val();
        setPlayers(data);
      });
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
        <Text style={{ fontSize: 24, fontWeight: "600", textAlign: 'center' }}>{gameCode}</Text>
      </View>
      <View style={{ rowGap: 8, flexDirection: 'column' }}>{ players && Object.keys(players).map((pseudo, i) => (
        <Text key={i} style={{ padding: 14, borderWidth: 1, borderColor: 'gray', borderRadius: 16, width: '100%' }}>{ pseudo }</Text>
      )) }</View>
    </View>
  );
};