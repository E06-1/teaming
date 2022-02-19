import React, { useEffect } from "react";
import {
  createBoard,
  overwrite as overwriteBoardState,
  selectBoardIds,
} from "../features/board/boardsSlice";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { v4 } from "uuid";
import Board from "../features/board/Board";
import { isRootState } from "../common/typeChecks";
import {
  createList,
  overwrite as overwriteListState,
} from "../features/list/listsSlice";
import { overwrite as overwriteCardState } from "../features/card/cardsSlice";
import { teaming } from "../../../types";
import FormDialog from "../components/formDialog/FormDialog";
import { Avatar, IconButton } from "@mui/material";

function App() {
  const dispatch = useAppDispatch();
  const boardIds = useAppSelector(selectBoardIds);
  const handleLogout = () => {};

  //Load Boards from local storage if available, if not initialize an Empty Board
  useEffect(() => {
    const state = JSON.parse(localStorage.getItem("state") || "{}") as unknown;
    if (!isRootState(state)) {
      const boardId: teaming.BoardId = `board:${v4()}`;
      dispatch(createBoard({ boardId, name: "main" }));

      const toDoListId: teaming.ListId = `list:${v4()}`;
      const inProgressListId: teaming.ListId = `list:${v4()}`;
      const doneListId: teaming.ListId = `list:${v4()}`;
      dispatch(
        createList({ listId: toDoListId, onBoardId: boardId, header: "To do" })
      );
      dispatch(
        createList({
          listId: inProgressListId,
          onBoardId: boardId,
          header: "In progress",
        })
      );
      dispatch(
        createList({ listId: doneListId, onBoardId: boardId, header: "Done" })
      );
    } else {
      dispatch(overwriteBoardState(state.boards));
      dispatch(overwriteListState(state.lists));
      dispatch(overwriteCardState(state.cards));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <header>
        <h1>
          <span className="green">T</span>ea<span className="white">mi</span>ng
        </h1>
        <div className="navPanel">
          <FormDialog />
          <IconButton onClick={handleLogout}>
            <Avatar>H</Avatar>
          </IconButton>
        </div>
      </header>
      <main>{boardIds[0] ? <Board id={boardIds[0]} /> : null}</main>
    </div>
  );
}

export default App;
