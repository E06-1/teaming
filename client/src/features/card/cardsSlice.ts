import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { teaming } from "../../../../types";

export interface CardsState {
  ids: teaming.CardId[];
  entries: { [key: teaming.CardId]: teaming.Card };
}

// Define the initial state using that type
const initialState: CardsState = {
  ids: [],
  entries: {},
};

export const cardsSlice = createSlice({
  name: "cards",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    overwrite: (state, action: PayloadAction<CardsState>) => action.payload,

    createCard: (
      state,
      action: PayloadAction<{
        cardId: teaming.CardId;
        onListId: teaming.ListId;
        content: string;
      }>
    ) => {
      state.ids.push(action.payload.cardId);
      state.entries[action.payload.cardId] = {
        id: action.payload.cardId,
        content: action.payload.content,
        listId: action.payload.onListId,
      };
    },

    changeList: (
      state,
      action: PayloadAction<{ cardId: teaming.CardId; listId: teaming.ListId }>
    ) => {
      state.entries[action.payload.cardId].listId = action.payload.listId;
    },

    changeContent: (
      state,
      action: PayloadAction<{ cardId: teaming.CardId; content: string }>
    ) => {
      state.entries[action.payload.cardId].content = action.payload.content;
    },

    deleteCard: (
      state,
      action: PayloadAction<{
        cardId: teaming.CardId;
        fromListId: teaming.ListId;
      }>
    ) => {
      state.ids = state.ids.filter(
        (cardId) => cardId !== action.payload.cardId
      );
      delete state.entries[action.payload.cardId];
    },
  },
});

export const { createCard, changeContent, overwrite, deleteCard, changeList } =
  cardsSlice.actions;

export const cardActions = cardsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCard = (cardId: teaming.CardId) => (state: RootState) =>
  state.cards.entries[cardId];
export const selectCardPosition =
  (cardId: teaming.CardId) => (state: RootState) => {
    const listId = state.cards.entries[cardId].listId;
    return state.lists.entries[listId].cards.indexOf(cardId);
  };

export default cardsSlice.reducer;
