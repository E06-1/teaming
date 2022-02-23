import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { teaming } from "../../../../types";
import { deleteList } from "../list/listsSlice";

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
      const pos = Object.values(state.entries).reduce(
        (max, card) => (card.pos >= max ? card.pos + 1 : max),
        0
      );
      state.ids.push(action.payload.cardId);
      state.entries[action.payload.cardId] = {
        _id: action.payload.cardId,
        content: action.payload.content,
        listId: action.payload.onListId,
        pos,
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

    moveCardToList: (
      state,
      action: PayloadAction<{
        cardId: teaming.CardId;
        toListId: teaming.ListId;
      }>
    ) => {
      const pos = Object.values(state.entries)
        .filter((card) => card.listId === action.payload.toListId)
        .reduce((max, card) => (card.pos >= max ? card.pos + 1 : max), 0);
      state.entries[action.payload.cardId].listId = action.payload.toListId;
      state.entries[action.payload.cardId].pos = pos;
    },

    switchCardPositions: (
      state,
      action: PayloadAction<{
        cardId1: teaming.CardId;
        cardId2: teaming.CardId;
      }>
    ) => {
      if (
        state.entries[action.payload.cardId1].listId ===
        state.entries[action.payload.cardId2].listId
      ) {
        const oldPos = state.entries[action.payload.cardId1].pos;
        state.entries[action.payload.cardId1].pos =
          state.entries[action.payload.cardId2].pos;
        state.entries[action.payload.cardId2].pos = oldPos;
      }
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

  extraReducers: (builder) => {
    builder.addCase(deleteList, (state, action) => {
      const cardIds = Object.values(state.entries)
        .filter((card) => card.listId === action.payload.listId)
        .map((card) => card._id);
      cardIds.forEach((id) => {
        delete state.entries[id];
      });
      state.ids = state.ids.filter((id) => !cardIds.includes(id));
    });
  },
});

export const {
  createCard,
  changeContent,
  overwrite,
  deleteCard,
  changeList,
  moveCardToList,
  switchCardPositions,
} = cardsSlice.actions;

export const cardActions = cardsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCard = (cardId: teaming.CardId) => (state: RootState) =>
  state.cards.entries[cardId];

export default cardsSlice.reducer;
