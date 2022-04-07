import {ItemView} from "../../api/entities/ItemView";

export interface ItemsViewProps{
    items:ItemView[];
    onReload:any;
    hasMore:boolean;
}