import { configureStore, createSlice } from '@reduxjs/toolkit';

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

export default configureStore({
  reducer: configSlice.reducer
})