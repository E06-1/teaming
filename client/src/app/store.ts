import { configureStore, Middleware } from "@reduxjs/toolkit";
import boardSlice from "../features/board/boardsSlice";
import cardSlice from "../features/card/cardsSlice";
import dndSlice from "../features/dnd/dndSlice";
import listSlice from "../features/list/listsSlice";
import userSlice from "../features/user/userSlice";

//Middleware should forward the action via Websocket Connection to the Backend, needs to be implemented
const forwardAction: Middleware = () => {
  return (next) => (action) => {
    console.warn(
      "IMPLEMENT ME! This middleware should forward the received Action to the Backend via Websocket."
    );
    console.log("will dispatch", action);

    // Call the next dispatch method in the middleware chain.
    return next(action);
  };
};

export const store = configureStore({
  reducer: {
    lists: listSlice,
    cards: cardSlice,
    boards: boardSlice,
    user: userSlice,
    dnd: dndSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(forwardAction),
});

const saveToLocalStorage = async () => {
  const { boards, lists, cards } = store.getState();
  localStorage.setItem("state", JSON.stringify({ boards, lists, cards }));
};

store.subscribe(saveToLocalStorage);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
