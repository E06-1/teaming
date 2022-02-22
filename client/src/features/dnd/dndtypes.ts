import { teaming } from "../../../../types";

export namespace DnDItems {
  export interface List {
    id: teaming.ListId;
    fromPos: number;
  }
  export interface Card {
    id: teaming.CardId;
    fromListId: teaming.ListId;
    fromPos: number;
  }
}

export enum DnDTypes {
  List = "list",
  Card = "card",
}
