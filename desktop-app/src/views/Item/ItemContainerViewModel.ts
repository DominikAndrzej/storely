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
import {Item} from "../../api/entities/Item";
import {ItemView} from "../../api/entities/ItemView";

export class ItemContainerViewModel {

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
        onSuccess: (rentals: Rental[], item: ItemView, entities: Item[] | null) => void,
        onError: (error: UIError) => void,
        itemId: any,
        search: string,
        offset: number,
        sort: RentalSort): Promise<void> {

        try {
            this._apiViewEvents.onViewLoading(ApiViewNames.Main);
            let entities = null;

            const item: ItemView = await this._apiClient.getItemViewById(itemId);
            const rentals = await this._apiClient.getItemRentalsById(itemId, search, offset, sort);
            if(item.returnable){
                entities = await this._apiClient.getItemsByTemplateId(itemId);
            }
            this._apiViewEvents.onViewLoaded(ApiViewNames.Main);
            onSuccess(rentals, item, entities);

        }
        catch (e) {
            console.log("XD catch", e);
            const error = ErrorFactory.fromException(e);
            this._apiViewEvents.onViewLoadFailed(ApiViewNames.Main, error);
            onError(error);
        }
    }
}
