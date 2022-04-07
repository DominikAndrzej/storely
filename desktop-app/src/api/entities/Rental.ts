/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {User} from "./User";
import {Item} from "./Item";

export interface Rental {
    id:number;
    rentDate:string;
    returnDate:string | null;
    isReturnable:boolean;
    quantity:number;
    user:User;
    item:Item;
    remainingTime:number;
}
