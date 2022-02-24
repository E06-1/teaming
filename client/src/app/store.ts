import { configureStore, isAllOf, Middleware } from "@reduxjs/toolkit";
import axios from "axios";
import { teaming } from "../../../types";
import { isBoard, isCard, isList } from "../common/typeChecks";
import boardSlice, {
  overwrite as overwriteBoard,
} from "../features/board/boardsSlice";
import cardSlice, {
  overwrite as overwriteCard,
} from "../features/card/cardsSlice";
import dndSlice from "../features/dnd/dndSlice";
import listSlice, {
  overwrite as overwriteList,
} from "../features/list/listsSlice";
import userSlice, { login } from "../features/user/userSlice";

//Middleware should forward the action via Websocket Connection to the Backend, needs to be implemented
const loginHandler: Middleware = (store) => {
  return (next) => (action) => {
    const isLoginAction = isAllOf(login);

    if (isLoginAction(action)) {
      addNewBoards({
        user: action.payload.value,
        token: action.payload.token,
      });
      sync(action.payload.token);
    }
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
    getDefaultMiddleware().concat(loginHandler),
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

async function addNewBoards({
  user,
  token,
}: {
  user: teaming.User;
  token: string;
}) {
  const state = store.getState();
  const newBoards = Object.values(state.boards.entries).filter(
    (board) => board.admins.length === 0
  );
  for (const board of newBoards) {
    try {
      console.log(board);

      const response = await axios.post("/board", board, {
        headers: { Authorization: `bearer ${token}` },
      });
      if (isBoard(response.data)) store.dispatch(overwriteBoard(response.data));

      const lists = Object.values(state.lists.entries).filter(
        (list) => list.boardId === board._id
      );
      for (const list of lists) {
        const response = await axios.post("/list", list, {
          headers: { Authorization: `bearer ${token}` },
        });
        if (isList(response.data)) store.dispatch(overwriteList(response.data));

        const cards = Object.values(state.cards.entries).filter(
          (card) => card.listId === list._id
        );
        for (const card of cards) {
          const response = await axios.post("/card", card, {
            headers: { Authorization: `bearer ${token}` },
          });
          if (isCard(response.data))
            store.dispatch(overwriteCard(response.data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function sync(token: string) {}
