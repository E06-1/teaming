import Container from "@mui/material/Container";
import { v4 } from "uuid";
import type { teaming } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import List from "../list/List";
import { createList } from "../list/listSlice";
import { addList, selectBoard } from "./boardSlice";

interface BoardProps {
  id: teaming.BoardId;
}

function Board({ id }: BoardProps) {
  const dispatch = useAppDispatch();
  const { name, lists, collaborators, admins } = useAppSelector(
    selectBoard(id)
  );

  const handleCreateList = () => {
    const listId: teaming.ListId = `list:${v4()}`;
    dispatch(createList({ listId, header: "new" }));
    dispatch(addList({ boardId: id, listId }));
  };

  return (
    <div className="Board">
      <h2>{name}</h2>
      <Container sx={{display: "flex", gap: "1rem"}}>    
        {lists.map((id) => (
          <List key={id} id={id} />
        ))}
        <input type="button" value="Create List" onClick={handleCreateList} />
      </Container>
    </div>
  );
}

export default Board;
