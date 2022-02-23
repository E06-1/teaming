import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { teaming } from "../../../../types";

// Define Type of state
export interface BoardsState {
  ids: teaming.BoardId[];
  entries: { [key: teaming.BoardId]: teaming.Board };
}

// Define the initial state using that type
const initialState: BoardsState = {
  ids: [],
  entries: {},
};

export const boardSlice = createSlice({
  name: "boards",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    overwrite: (state, action: PayloadAction<BoardsState>) => action.payload,

    createBoard: (
      state,
      action: PayloadAction<{ boardId: teaming.BoardId; name: string }>
    ) => {
      state.ids.push(action.payload.boardId);
      state.entries[action.payload.boardId] = {
        _id: action.payload.boardId,
        name: action.payload.name,
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
});

export const {
  createBoard,
  deleteBoard,
  addAdmin,
  addCollaborator,
  removeCollaborator,
  changeName,
  overwrite,
} = boardSlice.actions;

export const boardActions = boardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBoard = (boardId: teaming.BoardId) => (state: RootState) =>
  state.boards.entries[boardId];
export const selectBoardIds = (state: RootState) => state.boards.ids;
export const selectListIdsOnBoard =
  (boardId: teaming.BoardId) => (state: RootState) =>
    Object.values(state.lists.entries)
      .filter((list) => list.boardId === boardId)
      .sort((a, b) => a.pos - b.pos)
      .map((list) => list._id);

export default boardSlice.reducer;
