import EventBus from "js-event-bus";
import {ApiViewNames} from "./ApiViewNames";
import {EventNames} from "../events/EventNames";
import {DataStatusEvent} from "../events/DataStatusEvent";
import {ErrorCodes} from "../errors/ErrorCodes";
import {UIError} from "../errors/UiError";
import {LoginRequiredEvent} from "../events/LoginRequiredEvent";

export class ApiViewEvents {

    private readonly _eventBus: EventBus;
    private _views: [string, boolean][];
    private _loginRequired: boolean;


    public constructor(eventBus: EventBus) {

        this._eventBus = eventBus;
        this._views = [];
        this._loginRequired = false;
        this._setupCallbacks();
    }


    public addView(name: string): void {
        this._views.push([name, false]);
    }


    public onViewLoading(name: string): void {

        this._updateLoadState(name, false);

        if (name === ApiViewNames.Main) {
            this._eventBus.emit(EventNames.DataStatus, null, new DataStatusEvent(false));
        }
    }


    public onViewLoaded(name: string): void {

        this._updateLoadState(name, true);

        if (name === ApiViewNames.Main) {
            this._eventBus.emit(EventNames.DataStatus, null, new DataStatusEvent(true));
        }

        this._triggerLoginIfRequired();
    }


    public onViewLoadFailed(name: string, error: UIError): void {

        this._updateLoadState(name, true);

        if (error.errorCode === ErrorCodes.loginRequired) {
            this._loginRequired = true;
        }

        this._triggerLoginIfRequired();
    }

    public clearState(): void {
        this._views.forEach((i) => i[1] = false);
        this._loginRequired = false;
    }

    private _updateLoadState(name: string, value: boolean) {

        const found = this._views.find(i => i[0] === name);
        if (found) {
            found[1] = value;
        }
    }

    private _triggerLoginIfRequired(): void {

        const allViewsLoaded = this._views.filter(i => i[1] === true).length === this._views.length;
        if (allViewsLoaded && this._loginRequired) {
            this._eventBus.emit(EventNames.LoginRequired, null, new LoginRequiredEvent());
        }
    }

    private _setupCallbacks(): void {
        this.onViewLoading = this.onViewLoading.bind(this);
        this.onViewLoaded = this.onViewLoaded.bind(this);
        this.onViewLoadFailed = this.onViewLoadFailed.bind(this);
    }
}