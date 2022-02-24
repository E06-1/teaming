import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { teaming } from "../../../../types";
import { deleteBoard } from "../board/boardsSlice";
import { isList, isListsState } from "../../common/typeChecks";

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
    overwrite: (state, action: PayloadAction<ListsState | teaming.List>) => {
      if (isListsState(action.payload)) return action.payload;
      if (isList(action.payload))
        state.entries[action.payload._id] = action.payload;
    },

    createList: (
      state,
      action: PayloadAction<{
        listId: teaming.ListId;
        onBoardId: teaming.BoardId;
        header: string;
      }>
    ) => {
      const pos = Object.values(state.entries).reduce(
        (max, list) => (list.pos >= max ? list.pos + 1 : max),
        0
      );
      console.log(pos);

      state.ids.push(action.payload.listId);
      state.entries[action.payload.listId] = {
        _id: action.payload.listId,
        header: action.payload.header,
        boardId: action.payload.onBoardId,
        pos,
      };
    },

    moveListToPos: (
      state,
      action: PayloadAction<{ listId: teaming.ListId; toPos: number }>
    ) => {
      state.entries[action.payload.listId].pos = action.payload.toPos;
    },

    switchListPositions: (
      state,
      action: PayloadAction<{
        listId1: teaming.ListId;
        listId2: teaming.ListId;
      }>
    ) => {
      const oldPos = state.entries[action.payload.listId1].pos;
      state.entries[action.payload.listId1].pos =
        state.entries[action.payload.listId2].pos;
      state.entries[action.payload.listId2].pos = oldPos;
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
      }>
    ) => {
      state.ids = state.ids.filter(
        (listId) => listId !== action.payload.listId
      );
      delete state.entries[action.payload.listId];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteBoard, (state, action) => {
      const ListIds = Object.values(state.entries)
        .filter((list) => list.boardId === action.payload.boardId)
        .map((list) => list._id);
      ListIds.forEach((id) => {
        delete state.entries[id];
      });
      state.ids = state.ids.filter((id) => !ListIds.includes(id));
    });
  },
});

export const {
  createList,
  deleteList,
  changeHeader,
  overwrite,
  moveListToPos,
  switchListPositions,
} = listSlice.actions;

export const listActions = listSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectList = (listId: teaming.ListId) => (state: RootState) =>
  state.lists.entries[listId];
export const selectCardIdsOnList =
  (listId: teaming.ListId) => (state: RootState) =>
    Object.values(state.cards.entries)
      .filter((card) => card.listId === listId)
      .sort((a, b) => a.pos - b.pos)
      .map((card) => card._id);

export default listSlice.reducer;
