/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {Category} from "./Category";
import {Group} from "./Group";

export interface ItemTemplate {
    id: number;
    name:string;
    model:string;
    description:string;
    returnable:boolean;
    timeLimit:number|null //hours
    criticalQuantity:number;
    category:Category;
    groups:Group[];
    added: Date | null;
}
