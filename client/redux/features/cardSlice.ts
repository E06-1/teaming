import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { teaming } from "../../../types";

interface CardState {
  ids: teaming.CardId[]
  entries: { [key: teaming.CardId]: teaming.Card }
}

// Define the initial state using that type
const initialState: CardState = {
  ids: [],
  entries: {}
};

export const listSlice = createSlice({
  name: "card",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    createCard: (state, action: PayloadAction<{cardId: teaming.CardId, content: string }>) => {
      state.ids.push(action.payload.cardId)
      state.entries[action.payload.cardId] = {
        id: action.payload.cardId,
        content: action.payload.content,
      };
    },

    changeContent: (
      state,
      action: PayloadAction<{ cardId: teaming.CardId; content: string }>
    ) => {
      state.entries[action.payload.cardId].content = action.payload.content;
    },

    deleteCard: (state, action: PayloadAction<{ cardId: teaming.CardId }>) => {
      state.ids = state.ids.filter(cardId => cardId !== action.payload.cardId)
      delete state.entries[action.payload.cardId];
    },

  },
});

export const {
  createCard,
  changeContent,
  deleteCard
} = listSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCard = (cardId: teaming.CardId) => (state: RootState) => state.card.entries[cardId]

export default listSlice.reducer;