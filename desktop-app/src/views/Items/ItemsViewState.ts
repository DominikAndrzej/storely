/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {ItemSort} from "../../api/enums/ItemSort";

export interface ItemsViewState{
    offset:number;
    text:string;
    sortBy:ItemSort;
    isLoading:boolean;
}
