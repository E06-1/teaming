import React from 'react';
import type {teaming} from "../../../types";

interface BoardProps {
    id: teaming.BoardId;
}

function Board({id}: BoardProps) {
  return (
    <div className="Board">
    </div>
  );
}

export default Board;
