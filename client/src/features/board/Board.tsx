import Container from "@mui/material/Container";
import { useDrop } from "react-dnd";
import { v4 } from "uuid";
import type { teaming } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DnDTypes } from "../dnd/dndtypes";
import List from "../list/List";
import { createList } from "../list/listsSlice";
import { selectBoard } from "./boardsSlice";

interface BoardProps {
  id: teaming.BoardId;
}

function Board({ id }: BoardProps) {
  const dispatch = useAppDispatch();
  const { name, lists, collaborators } = useAppSelector(selectBoard(id));

  const handleCreateList = () => {
    const listId: teaming.ListId = `list:${v4()}`;
    dispatch(createList({ listId, onBoardId: id, header: "new" }));
  };

  const [, drop] = useDrop({
    accept: "list",
  });

  return (
    <div className="Board" ref={drop}>
      <h2>{name}</h2>
      <Container sx={{ display: "flex", gap: "1rem" }}>
        {lists.map((id) => (
          <List key={id} id={id} />
        ))}
        <input type="button" value="Create List" onClick={handleCreateList} />
      </Container>
    </div>
  );
}

export default Board;
