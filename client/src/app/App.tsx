import React, { useEffect } from "react";
import { addList, createBoard, overwrite as overwriteBoardState, selectBoardIds } from "../features/board/boardSlice";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import {v4} from "uuid";
import Board from "../features/board/Board";
import { isRootState } from "../common/typeChecks";
import { createList, overwrite as overwriteListState } from "../features/list/listSlice";
import { overwrite as overwriteCardState } from "../features/card/cardSlice";
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
      dispatch(createList({ listId: toDoListId, header: "To do" }));
      dispatch(createList({ listId: inProgressListId, header: "In progress" }));
      dispatch(createList({ listId: doneListId, header: "Done" }));

      dispatch(addList({ boardId, listId: toDoListId }));
      dispatch(addList({ boardId, listId: inProgressListId }));
      dispatch(addList({ boardId, listId: doneListId }));
    } else {
      dispatch(overwriteBoardState(state.board));
      dispatch(overwriteListState(state.list));
      dispatch(overwriteCardState(state.card));
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
