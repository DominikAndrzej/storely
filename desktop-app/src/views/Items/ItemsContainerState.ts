import {ItemView} from "../../api/entities/ItemView";

export interface ItemsContainerState{
    items:ItemView[];
    hasMore:boolean;
}