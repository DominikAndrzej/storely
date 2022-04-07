/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {Rental} from "../../api/entities/Rental";

export interface NonReturnableRentalsContainerState {
    rentals: Rental[];
    hasMore: boolean;
}
