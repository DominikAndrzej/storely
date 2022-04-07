/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {UserSort} from "../../api/enums/UserSort";

export interface UsersViewState {
    offset:number;
    text:string;
    sortBy:UserSort
    isLoading:boolean;
}
