import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { teaming } from "../../../../types";
import { RootState } from "../../app/store";

export interface UserState {
  value: teaming.User | null;
  token: string | null;
}

const init: UserState = {
  value: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: init,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ value: teaming.User; token: string }>
    ) => {
      state.value = action.payload.value;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.value = null;
      state.token = null;
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.value;
export const selectToken = (state: RootState) => state.user.token;
