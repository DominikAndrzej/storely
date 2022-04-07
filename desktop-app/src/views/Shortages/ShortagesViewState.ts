/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {ShortageSort} from "../../api/enums/ShortageSort";

export interface ShortagesViewState{
    offset:number;
    text:string;
    sortBy:ShortageSort;
    isLoading:boolean;
}
