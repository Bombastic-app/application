import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    score: 1,
    gameCode: false,
    playerId: false,
    pseudo: false,
    currentTurn: false,
    alert: false,
    notification: false,
    status: false,
    reputation: 10,
    followers: 10,
    money: 10,
  },
  reducers: {
    upgradeScore: (state, action) => {
      state.score = state.score + 1
    },
    downgradeScore: (state, action) => {
      state.score = state.score - 1
    },
    updateScore: (state, action) => {
      state.score = action.payload
    },
    updateGameCode: (state, action) => {
      state.gameCode = action.payload
    },
    updatePlayerId: (state, action) => {
      state.playerId = action.payload
    },
    updatePseudo: (state, action) => {
      state.pseudo = action.payload
    },
    updateCurrentTurn: (state, action) => {
      state.currentTurn = action.payload
    },
    updateAlert: (state, action) => {
      state.alert = action.payload
    },
    updateNotification: (state, action) => {
      state.notification = action.payload
    },
    updateStatus: (state, action) => {
      state.status = action.payload
    },
    updateReputation: (state, action) => {
      state.reputation = action.payload
    },
    updateFollowers: (state, action) => {
      state.followers = action.payload
    },
    updateMoney: (state, action) => {
      state.money = action.payload
    },
  }
})

export const {
  upgradeScore,
  downgradeScore,
  updateScore,
  updateGameCode,
  updatePlayerId,
  updateCurrentTurn,
  updatePseudo,
  updateAlert,
  updateNotification,
  updateStatus,
  updateReputation,
  updateFollowers,
  updateMoney
} = configSlice.actions

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['playerId, gameCode']
};

const persistedReducer = persistReducer(persistConfig, configSlice.reducer);

export const store = configureStore({
  // reducer: configSlice.reducer
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);