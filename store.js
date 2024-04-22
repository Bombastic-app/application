import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    score: 1
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
    }
  }
})

export const {
  upgradeScore,
  downgradeScore,
  updateScore,
} = configSlice.actions

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, configSlice.reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);