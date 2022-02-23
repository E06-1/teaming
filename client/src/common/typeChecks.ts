import { teaming } from "../../../types";
import { BoardsState } from "../features/board/boardsSlice";
import { validate } from "uuid";
import { ListsState } from "../features/list/listsSlice";
import { CardsState } from "../features/card/cardsSlice";
import { RootState } from "../app/store";

export function isRootState(unknown: unknown): unknown is RootState {
  if (!isObjectWithKeys(unknown, { lists: 1, cards: 1, boards: 1 }))
    return false;
  if (!isBoardsState(unknown.boards)) return false;
  if (!isCardState(unknown.cards)) return false;
  if (!isListsState(unknown.lists)) return false;

  return true;
}

export function isBoardsState(unknown: unknown): unknown is BoardsState {
  if (!isObjectWithKeys(unknown, { ids: 1, entries: 1 })) return false;
  if (!isBoardIdArray(unknown.ids)) return false;
  if (!isBoardsStateEntriesObject(unknown.entries)) return false;

  return true;
}

export function isBoardId(unknown: unknown): unknown is teaming.BoardId {
  if (!(typeof unknown === "string")) return false;
  const [type, id] = unknown.split(":");
  if (type !== "board") return false;
  if (!validate(id)) return false;
  return true;
}

export function isBoard(unknown: unknown): unknown is teaming.Board {
  if (
    !isObjectWithKeys(unknown, {
      _id: 1,
      name: 1,
      collaborators: 1,
      admins: 1,
    })
  )
    return false;
  if (!isBoardId(unknown._id)) return false;
  if (!(typeof unknown.name === "string")) return false;
  if (!isUserIdArray(unknown.collaborators)) return false;
  if (!isUserIdArray(unknown.admins)) return false;

  return true;
}

export function isBoardIdArray(unknown: unknown): unknown is teaming.BoardId[] {
  if (!Array.isArray(unknown)) return false;
  for (const id of unknown) {
    if (!isBoardId(id)) return false;
  }
  return true;
}

export function isBoardsStateEntriesObject(
  unknown: unknown
): unknown is { [key: teaming.BoardId]: teaming.Board } {
  if (!(typeof unknown === "object")) return false;
  if (unknown === null) return false;

  const c1 = unknown as { [key: string]: unknown };

  for (const key in c1) {
    if (!isBoardId(key)) return false;
    if (!isBoard(c1[key])) return false;
  }
  return true;
}

export function isListIdArray(unknown: unknown): unknown is teaming.ListId[] {
  if (!Array.isArray(unknown)) return false;
  for (const id of unknown) {
    if (!isListId(id)) return false;
  }
  return true;
}

export function isUserIdArray(unknown: unknown): unknown is teaming.UserId[] {
  if (!Array.isArray(unknown)) return false;
  for (const id of unknown) {
    if (!isUserId(id)) return false;
  }
  return true;
}

export function isListId(unknown: unknown): unknown is teaming.ListId {
  if (!(typeof unknown === "string")) return false;
  const [type, id] = unknown.split(":");
  if (type !== "list") return false;
  if (!validate(id)) return false;
  return true;
}

export function isUserId(unknown: unknown): unknown is teaming.UserId {
  if (!(typeof unknown === "string")) return false;
  return true;
}

export function isCardId(unknown: unknown): unknown is teaming.CardId {
  if (!(typeof unknown === "string")) return false;
  const [type, id] = unknown.split(":");
  if (type !== "card") return false;
  if (!validate(id)) return false;
  return true;
}

export function isCardIdArray(unknown: unknown): unknown is teaming.CardId[] {
  if (!Array.isArray(unknown)) return false;
  for (const id of unknown) {
    if (!isCardId(id)) return false;
  }
  return true;
}

export function isListsState(unknown: unknown): unknown is ListsState {
  if (!isObjectWithKeys(unknown, { ids: 1, entries: 1 })) return false;
  if (!isListIdArray(unknown.ids)) return false;
  if (!isListsStateEntriesObject(unknown.entries)) return false;

  return true;
}

export function isCardState(unknown: unknown): unknown is CardsState {
  if (!isObjectWithKeys(unknown, { ids: 1, entries: 1 })) return false;
  if (!isCardIdArray(unknown.ids)) return false;
  if (!isCardsStateEntriesObject(unknown.entries)) return false;

  return true;
}

export function isListsStateEntriesObject(
  unknown: unknown
): unknown is { [key: teaming.ListId]: teaming.List } {
  if (!(typeof unknown === "object")) return false;
  if (unknown === null) return false;

  const c1 = unknown as { [key: string]: unknown };

  for (const key in c1) {
    if (!isListId(key)) return false;
    if (!isList(c1[key])) return false;
  }
  return true;
}

export function isList(unknown: unknown): unknown is teaming.List {
  if (!isObjectWithKeys(unknown, { _id: 1, header: 1, boardId: 1, pos: 1 }))
    return false;
  if (!isListId(unknown._id)) return false;
  if (!isBoardId(unknown.boardId)) return false;
  if (!(typeof unknown.header === "string")) return false;
  if (!(typeof unknown.pos === "number")) return false;
  return true;
}

export function isCardsStateEntriesObject(
  unknown: unknown
): unknown is { [key: teaming.CardId]: teaming.Card } {
  if (!(typeof unknown === "object")) return false;
  if (unknown === null) return false;

  const c1 = unknown as { [key: string]: unknown };

  for (const key in c1) {
    if (!isCardId(key)) return false;
    if (!isCard(c1[key])) return false;
  }
  return true;
}

export function isCard(unknown: unknown): unknown is teaming.Card {
  if (!isObjectWithKeys(unknown, { _id: 1, content: 1, listId: 1, pos: 1 }))
    return false;
  if (!isCardId(unknown._id)) return false;
  if (!isListId(unknown.listId)) return false;
  if (!(typeof unknown.content === "string")) return false;
  if (!(typeof unknown.pos === "number")) return false;

  return true;
}

export function isObjectWithKeys<T extends {}>(
  unknown: unknown,
  keys: T
): unknown is { [key in keyof typeof keys]: unknown } {
  if (!(typeof unknown === "object")) return false;
  if (unknown === null) return false;
  if (Object.keys(unknown).length !== Object.keys(keys).length) return false;
  for (const key in keys) {
    if (!(key in unknown)) return false;
  }
  return true;
}
