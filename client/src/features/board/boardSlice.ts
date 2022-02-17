import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteList } from "../list/listSlice";
import type { RootState } from "../../app/store";
import type { teaming } from "../../../../types";

// Define Type of state
export interface BoardState {
  ids: teaming.BoardId[];
  entries: { [key: teaming.BoardId]: teaming.Board };
}

// Define the initial state using that type
const initialState: BoardState = {
  ids: [],
  entries: {},
};

export const boardSlice = createSlice({
  name: "board",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    overwrite: (state, action: PayloadAction<BoardState>) => action.payload,

    createBoard: (
      state,
      action: PayloadAction<{ boardId: teaming.BoardId; name: string }>
    ) => {
      state.ids.push(action.payload.boardId);
      state.entries[action.payload.boardId] = {
        id: action.payload.boardId,
        name: action.payload.name,
        lists: [],
        collaborators: [],
        admins: [],
      };
    },

    changeName: (
      state,
      action: PayloadAction<{ boardId: teaming.BoardId; name: string }>
    ) => {
      state.entries[action.payload.boardId].name = action.payload.name;
    },

    deleteBoard: (
      state,
      action: PayloadAction<{ boardId: teaming.BoardId }>
    ) => {
      state.ids = state.ids.filter((id) => id !== action.payload.boardId);
      delete state.entries[action.payload.boardId];
    },

    addList: (
      state,
      action: PayloadAction<{
        boardId: teaming.BoardId;
        listId: teaming.ListId;
      }>
    ) => {
      state.entries[action.payload.boardId].lists.push(action.payload.listId);
    },

    removeList: (
      state,
      action: PayloadAction<{
        boardId: teaming.BoardId;
        listId: teaming.ListId;
      }>
    ) => {
      state.entries[action.payload.boardId].lists = state.entries[
        action.payload.boardId
      ].lists.filter((id) => id !== action.payload.listId);
    },

    moveListWithinBoard: (
      state,
      action: PayloadAction<{
        boardId: teaming.BoardId;
        listId: teaming.ListId;
        toPos: number;
      }>
    ) => {
      //Algorithm not effective for Boards with many lists. But we won't have so many.
      //Removing the list id
      const withoutList = state.entries[action.payload.boardId].lists.filter(
        (listId) => listId !== action.payload.listId
      );
      state.entries[action.payload.boardId].lists = [
        //Add all other listIds until the new position
        ...withoutList.slice(0, action.payload.toPos),
        //Add the listId on the correct position
        action.payload.listId,
        //Add the rest
        ...withoutList.slice(action.payload.toPos + 1),
      ];
    },

    addCollaborator: (
      state,
      action: PayloadAction<{
        boardId: teaming.BoardId;
        userId: teaming.UserId;
      }>
    ) => {
      state.entries[action.payload.boardId].collaborators.push(
        action.payload.userId
      );
    },

    removeCollaborator: (
      state,
      action: PayloadAction<{
        boardId: teaming.BoardId;
        userId: teaming.UserId;
      }>
    ) => {
      state.entries[action.payload.boardId].collaborators = state.entries[
        action.payload.boardId
      ].collaborators.filter((id) => id !== action.payload.userId);
    },

    addAdmin: (
      state,
      action: PayloadAction<{
        boardId: teaming.BoardId;
        userId: teaming.UserId;
      }>
    ) => {
      state.entries[action.payload.boardId].admins.push(action.payload.userId);
    },

    removeAdmin: (
      state,
      action: PayloadAction<{
        boardId: teaming.BoardId;
        userId: teaming.UserId;
      }>
    ) => {
      state.entries[action.payload.boardId].admins = state.entries[
        action.payload.boardId
      ].admins.filter((id) => id !== action.payload.userId);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(deleteList, (state, action) => {
      state.ids.forEach((boardId) => {
        if (state.entries[boardId].lists.includes(action.payload.listId))
          state.entries[boardId].lists = state.entries[boardId].lists.filter(
            (listId) => listId !== action.payload.listId
          );
      });
    });
  },
});

export const {
  createBoard,
  deleteBoard,
  addAdmin,
  addList,
  addCollaborator,
  removeAdmin,
  removeCollaborator,
  removeList,
  changeName,
  moveListWithinBoard,
  overwrite,
} = boardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBoard = (boardId: teaming.BoardId) => (state: RootState) =>
  state.board.entries[boardId];
export const selectBoardIds = (state: RootState) => state.board.ids;
export const selectListIdsForBoard = (boardId: teaming.BoardId) => (state: RootState) => state.board.entries[boardId].lists

export default boardSlice.reducer;
