/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */


import {Shortage} from "../../api/entities/Shortage";

export interface ShortagesContainerState{
    shortages:Shortage[];
    hasMore:boolean;
}
