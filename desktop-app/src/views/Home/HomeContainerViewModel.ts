/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {ApiClient} from "../../api/client/ApiClient";
import {ApiViewEvents} from "../../utilities/ApiViewEvents";
import EventBus from "js-event-bus";
import {UIError} from "../../errors/UiError";
import {ApiViewNames} from "../../utilities/ApiViewNames";
import {ErrorFactory} from "../../errors/ErrorFactory";
import {ChartBar} from "../../api/entities/ChartBar";
import {HomeWidgets} from "../../api/entities/HomeWidgets";
import {ShortageSort} from "../../api/enums/ShortageSort";
import {Shortage} from "../../api/entities/Shortage";


export class HomeContainerViewModel {

    private readonly _apiClient: ApiClient;
    private readonly _eventBus: EventBus;
    private readonly _apiViewEvents: ApiViewEvents;

    public constructor(
        apiClient: ApiClient,
        eventBus: EventBus,
        apiViewEvents: ApiViewEvents,
    ) {
        this._apiClient = apiClient;
        this._eventBus = eventBus;
        this._apiViewEvents = apiViewEvents;
    }



    public get eventBus(): EventBus {
        return this._eventBus;
    }


    public async callApi(
        onSuccess: (widgets:HomeWidgets, rentalChart:ChartBar[], retrievalChart:ChartBar[], shortages: Shortage[]) => void,
        onError: (error: UIError) => void): Promise<void> {

        try {
            this._apiViewEvents.onViewLoading(ApiViewNames.Main);
            const rentalChart = await this._apiClient.getRentalChart();
            const retrievalChart = await this._apiClient.getRetrievalChart();
            const widgets = await this._apiClient.getHomeWidgets();
            const shortages = await this._apiClient.getShortages("", 0, ShortageSort.QUANTITY);
            const shortagesS2 = await this._apiClient.getShortages("", 10, ShortageSort.QUANTITY);
            shortages.push(...shortagesS2);
            this._apiViewEvents.onViewLoaded(ApiViewNames.Main);
            onSuccess(widgets, rentalChart, retrievalChart, shortages);


        } catch (e) {
            console.log("EEE",e);
            const error = ErrorFactory.fromException(e);
            this._apiViewEvents.onViewLoadFailed(ApiViewNames.Main, error);
            onError(error);
        }
    }
}
