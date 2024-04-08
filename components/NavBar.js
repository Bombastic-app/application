import { StyleSheet, Text, View } from "react-native";

export default function NavBar() {
  return (
      <View>
        <Text style={styles.navBar}>Bombastic</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    marginTop: 50,
    padding: 20,
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 20
  },
});
