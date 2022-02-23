import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const init = true;

const userSlice = createSlice({
  name: "dnd",
  initialState: init,
  reducers: {
    allowDnd: (state) => (state = true),
    denyDnd: (state) => (state = false),
  },
});

export default userSlice.reducer;
export const { allowDnd, denyDnd } = userSlice.actions;
export const selectIsDnDAllowed = (state: RootState) => state.dnd;
