/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {ChartBar} from "../../api/entities/ChartBar";
import {HomeWidgets} from "../../api/entities/HomeWidgets";
import {Shortage} from "../../api/entities/Shortage";

export interface HomeContainerState{
    widgets: HomeWidgets | null;
    rentalChart: ChartBar[];
    retrievalChart: ChartBar[];
    shortages: Shortage[];
}
