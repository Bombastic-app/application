import { Stack } from "expo-router";
import "../styles/global.css";
import { store, persistor } from "../store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function StackLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "darkblue" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </PersistGate>
    </Provider>
  );
}
