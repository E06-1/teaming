import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCard, deleteCard } from "../card/cardsSlice";
import type { RootState } from "../../app/store";
import type { teaming } from "../../../../types";

export interface ListsState {
  ids: teaming.ListId[];
  entries: { [key: teaming.ListId]: teaming.List };
}

// Define the initial state using that type
const initialState: ListsState = {
  ids: [],
  entries: {},
};

export const listSlice = createSlice({
  name: "lists",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    overwrite: (state, action: PayloadAction<ListsState>) => action.payload,

    createList: (
      state,
      action: PayloadAction<{
        listId: teaming.ListId;
        onBoardId: teaming.BoardId;
        header: string;
      }>
    ) => {
      state.ids.push(action.payload.listId);
      state.entries[action.payload.listId] = {
        id: action.payload.listId,
        header: action.payload.header,
        cards: [],
        boardId: action.payload.onBoardId,
      };
    },

    changeHeader: (
      state,
      action: PayloadAction<{ listId: teaming.ListId; header: string }>
    ) => {
      state.entries[action.payload.listId].header = action.payload.header;
    },

    deleteList: (
      state,
      action: PayloadAction<{
        listId: teaming.ListId;
        fromBoardId: teaming.BoardId;
      }>
    ) => {
      state.ids = state.ids.filter(
        (listId) => listId !== action.payload.listId
      );
      delete state.entries[action.payload.listId];
    },

    addCard: (
      state,
      action: PayloadAction<{
        listId: teaming.ListId;
        cardId: teaming.CardId;
      }>
    ) => {
      state.entries[action.payload.listId].cards.push(action.payload.cardId);
    },

    removeCard: (
      state,
      action: PayloadAction<{
        listId: teaming.ListId;
        cardId: teaming.CardId;
      }>
    ) => {
      state.entries[action.payload.listId].cards = state.entries[
        action.payload.listId
      ].cards.filter((id) => id !== action.payload.cardId);
    },

    moveCardWithinList: (
      state,
      action: PayloadAction<{
        listId: teaming.ListId;
        cardId: teaming.CardId;
        toPos: number;
      }>
    ) => {
      //Algorithm not effective for Boards with many lists. But we won't have so many.
      //Removing the list id
      const withoutList = state.entries[action.payload.listId].cards.filter(
        (cardId) => cardId !== action.payload.cardId
      );
      state.entries[action.payload.listId].cards = [
        //Add all other listIds until the new position
        ...withoutList.slice(0, action.payload.toPos),
        //Add the listId on the correct position
        action.payload.cardId,
        //Add the rest
        ...withoutList.slice(action.payload.toPos),
      ];
    },

    moveCardToList: (
      state,
      action: PayloadAction<{
        fromListId: teaming.ListId;
        toListId: teaming.ListId;
        cardId: teaming.CardId;
        toPos: number;
      }>
    ) => {
      //Remove Card from fromList
      state.entries[action.payload.fromListId].cards = state.entries[
        action.payload.fromListId
      ].cards.filter((cardId) => cardId !== action.payload.cardId);

      //Add Card to toList
      state.entries[action.payload.toListId].cards = [
        ...state.entries[action.payload.toListId].cards.slice(
          0,
          action.payload.toPos
        ),
        action.payload.cardId,
        ...state.entries[action.payload.toListId].cards.slice(
          action.payload.toPos
        ),
      ];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(deleteCard, (state, action) => {
      state.entries[action.payload.fromListId].cards = state.entries[
        action.payload.fromListId
      ].cards.filter((cardId) => cardId !== action.payload.cardId);
    });

    builder.addCase(createCard, (state, action) => {
      state.entries[action.payload.onListId].cards.push(action.payload.cardId);
    });
  },
});

export const {
  createList,
  deleteList,
  addCard,
  removeCard,
  changeHeader,
  moveCardWithinList,
  moveCardToList,
  overwrite,
} = listSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectList = (listId: teaming.ListId) => (state: RootState) =>
  state.lists.entries[listId];
export const selectListPosition =
  (listId: teaming.ListId) => (state: RootState) => {
    const boardId = state.lists.entries[listId].boardId;
    return state.boards.entries[boardId].lists.indexOf(listId);
  };

export default listSlice.reducer;
