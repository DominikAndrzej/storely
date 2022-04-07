import {ApiClient} from "../../api/client/ApiClient";
import EventBus from "js-event-bus";
import {ApiViewEvents} from "../../utilities/ApiViewEvents";
import {UIError} from "../../errors/UiError";
import {Item} from "../../api/entities/Item";
import {ApiViewNames} from "../../utilities/ApiViewNames";
import {ErrorFactory} from "../../errors/ErrorFactory";
import {Authenticator} from "../../auth/Authenticator";

export class LoginContainerViewModel {

    private readonly _apiClient: ApiClient;
    private readonly _eventBus: EventBus;
    private readonly _authenticator: Authenticator;
    private readonly _apiViewEvents: ApiViewEvents;

    public constructor(
        apiClient: ApiClient,
        eventBus: EventBus,
        apiViewEvents: ApiViewEvents,
        authenticator:Authenticator
    ) {
        this._authenticator = authenticator;
        this._apiClient = apiClient;
        this._eventBus = eventBus;
        this._apiViewEvents = apiViewEvents;
    }


    public get eventBus(): EventBus {
        return this._eventBus;
    }


    public async load(): Promise<void> {
        this._apiViewEvents.onViewLoaded(ApiViewNames.Main);

    }

    public async login(
        onSuccess: () => void,
        onError: (error: UIError) => void,
        email:string,
        password:string): Promise<void> {
        try {
           await this._authenticator.login(email, password);
           onSuccess();

        } catch (e) {
            console.log("EEE",e)
            const error = ErrorFactory.fromException(e);
            this._apiViewEvents.onViewLoadFailed(ApiViewNames.Main, error);
            onError(error);
        }
    }
}