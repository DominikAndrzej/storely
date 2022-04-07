import {ItemTemplate} from "./ItemTemplate";

export interface Item {
    id: number;
    quantity:number;
    itemTemplate:ItemTemplate;
    added:Date|null;
}
