import { teaming } from "../../../../types";

export namespace DnDItems {
  export interface List {
    id: teaming.ListId;
  }
  export interface Card {
    id: teaming.CardId;
    fromListId: teaming.ListId;
  }
}

export enum DnDTypes {
  List = "list",
  Card = "card",
}
