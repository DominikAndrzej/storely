/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {ApiClient} from "../../api/client/ApiClient";
import EventBus from "js-event-bus";
import {ApiViewEvents} from "../../utilities/ApiViewEvents";
import {UIError} from "../../errors/UiError";
import {ApiViewNames} from "../../utilities/ApiViewNames";
import {ErrorFactory} from "../../errors/ErrorFactory";
import {Rental} from "../../api/entities/Rental";
import {RentalSort} from "../../api/enums/RentalSort";
import {RentalReturnable} from "../../api/enums/RentalReturnable";

export class NonReturnableRentalsContainerViewModel {

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
        onSuccess: (rentals: Rental[]) => void,
        onError: (error: UIError) => void,
        search: string,
        offset: number,
        sort: RentalSort): Promise<void> {

        try {
            this._apiViewEvents.onViewLoading(ApiViewNames.Main);
            const rentals = await this._apiClient.getRentals(search, offset, sort, RentalReturnable.NON_RETURNABLE);
            this._apiViewEvents.onViewLoaded(ApiViewNames.Main);
            onSuccess(rentals);


        } catch (e) {
            const error = ErrorFactory.fromException(e);
            this._apiViewEvents.onViewLoadFailed(ApiViewNames.Main, error);
            onError(error);
        }
    }
}
