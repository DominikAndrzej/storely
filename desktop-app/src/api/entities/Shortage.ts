/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */


import {Group} from "./Group";
import {Category} from "./Category";

export interface Shortage {
    id: number;
    quantity: number;
    model: string;
    name: string;
    criticalQuantity: number;
    groups: Group[];
    category: Category;
    added: Date | null;
    averageRentals: number;
    cover: number;

}
