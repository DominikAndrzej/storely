/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {HomeWidgets} from "../../api/entities/HomeWidgets";
import {ChartBar} from "../../api/entities/ChartBar";
import {Shortage} from "../../api/entities/Shortage";

export interface HomeViewProps{
    widgets: HomeWidgets | null,
    rentalChart: ChartBar[],
    retrievalChart: ChartBar[],
    shortages: Shortage [];
}
