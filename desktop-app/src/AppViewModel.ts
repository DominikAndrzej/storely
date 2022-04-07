/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {ApiClient} from "./api/client/ApiClient";
import EventBus from "js-event-bus";
import {EventNames} from "./events/EventNames";
import {ReloadMainViewEvent} from "./events/ReloadMainViewEvent";
import {Configuration} from "./configuration/Configuration";
import {RendererEvents} from "./ipc/RendererEvents";
import {Authenticator} from "./auth/Authenticator";
import {AuthenticatorImpl} from "./auth/AuthenticatorImpl";
import {ItemsContainerViewModel} from "./views/Items/ItemsContainerViewModel";
import {ApiViewEvents} from "./utilities/ApiViewEvents";
import {ApiViewNames} from "./utilities/ApiViewNames";
import {LoginContainerViewModel} from "./views/Login/LoginContainerViewModel";
import {HomeContainerViewModel} from "./views/Home/HomeContainerViewModel";
import {ShortagesContainerViewModel} from "./views/Shortages/ShortagesContainerViewModel";
import {UsersContainerViewModel} from "./views/Users/UsersContainerViewModel";
import {ReturnableRentalsContainerViewModel} from "./views/ReturnableRentals/ReturnableRentalsContainerViewModel";
import {
    NonReturnableRentalsContainerViewModel
} from "./views/NonReturnableRentals/NonReturnableRentalsContainerViewModel";
import {ItemContainerViewModel} from "./views/Item/ItemContainerViewModel";

export class AppViewModel{
    private _apiClient : ApiClient | null;
    private _configuration: Configuration | null;

    private _itemsContainerViewModel: ItemsContainerViewModel | null;
    private _loginContainerViewModel: LoginContainerViewModel | null;
    private _homeContainerViewModel: HomeContainerViewModel | null;
    private _shortagesContainerViewModel: ShortagesContainerViewModel | null;
    private _usersContainerViewModel: UsersContainerViewModel | null;
    private _returnableRentalsContainerViewModel: ReturnableRentalsContainerViewModel | null;
    private _nonReturnableRentalsContainerViewModel: NonReturnableRentalsContainerViewModel | null;

    private _itemContainerViewModel: ItemContainerViewModel | null;


    private readonly _ipcEvents: RendererEvents;
    private readonly _eventBus: EventBus;
    private readonly _apiViewEvents: ApiViewEvents;

    private _authenticator: Authenticator | null;

    private _isInitialised: boolean;

    public constructor() {
        this._apiClient = null;
        this._configuration=null;
        this._authenticator = null;

        this._eventBus = new EventBus();
        this._ipcEvents = new RendererEvents();
        this._apiViewEvents = new ApiViewEvents(this._eventBus);
        this._apiViewEvents.addView(ApiViewNames.Main);

        this._itemsContainerViewModel = null;
        this._loginContainerViewModel = null;
        this._homeContainerViewModel = null;
        this._shortagesContainerViewModel = null;
        this._usersContainerViewModel =  null;
        this._returnableRentalsContainerViewModel =  null;
        this._nonReturnableRentalsContainerViewModel =  null;

        this._itemContainerViewModel =  null;



        this._isInitialised = false;

        this._setupCallbacks();
    }

    public async initialise():Promise<void>{
        this._configuration = await this._ipcEvents.loadConfiguration();
        this._authenticator = new AuthenticatorImpl(this._ipcEvents, this._eventBus, this._configuration.api.url);

        this._apiClient = new ApiClient(this._configuration.api.url, this._authenticator);

        this._isInitialised=true;
    }

    public get isInitialised (): boolean{
        return this._isInitialised;
    }

    public get eventBus():EventBus{
        return this._eventBus;
    }

    get apiClient(): ApiClient | null {
        return this._apiClient;
    }

    get configuration(): Configuration | null {
        return this._configuration;
    }

    get ipcEvents(): RendererEvents {
        return this._ipcEvents;
    }

    get apiViewEvents(): ApiViewEvents {
        return this._apiViewEvents;
    }

    public getItemsViewModel(): ItemsContainerViewModel {

        if (!this._itemsContainerViewModel) {

            this._itemsContainerViewModel = new ItemsContainerViewModel
            (
                this._apiClient!,
                this._eventBus,
                this._apiViewEvents,
            );
        }

        return this._itemsContainerViewModel;
    }

    public getLoginViewModel(): LoginContainerViewModel {

        if (!this._loginContainerViewModel) {

            this._loginContainerViewModel = new LoginContainerViewModel
            (
                this._apiClient!,
                this._eventBus,
                this._apiViewEvents,
                this._authenticator!
            );
        }

        return this._loginContainerViewModel;
    }

    public getHomeViewModel(): HomeContainerViewModel {

        if (!this._homeContainerViewModel) {

            this._homeContainerViewModel = new HomeContainerViewModel
            (
                this._apiClient!,
                this._eventBus,
                this._apiViewEvents,
            );
        }

        return this._homeContainerViewModel;
    }

    public getShortagesViewModel(): ShortagesContainerViewModel {

        if (!this._shortagesContainerViewModel) {

            this._shortagesContainerViewModel = new ShortagesContainerViewModel
            (
                this._apiClient!,
                this._eventBus,
                this._apiViewEvents,
            );
        }

        return this._shortagesContainerViewModel;
    }

    public getUsersViewModel(): UsersContainerViewModel {

        if (!this._usersContainerViewModel) {

            this._usersContainerViewModel = new UsersContainerViewModel
            (
                this._apiClient!,
                this._eventBus,
                this._apiViewEvents,
            );
        }

        return this._usersContainerViewModel;
    }

    public getReturnableRentalsViewModel(): ReturnableRentalsContainerViewModel {

        if (!this._returnableRentalsContainerViewModel) {

            this._returnableRentalsContainerViewModel = new ReturnableRentalsContainerViewModel
            (
                this._apiClient!,
                this._eventBus,
                this._apiViewEvents,
            );
        }

        return this._returnableRentalsContainerViewModel;
    }

    public getNonReturnableRentalsViewModel(): NonReturnableRentalsContainerViewModel {

        if (!this._nonReturnableRentalsContainerViewModel) {

            this._nonReturnableRentalsContainerViewModel = new NonReturnableRentalsContainerViewModel
            (
                this._apiClient!,
                this._eventBus,
                this._apiViewEvents,
            );
        }

        return this._nonReturnableRentalsContainerViewModel;
    }

    public getItemViewModel(): ItemContainerViewModel {

        if (!this._itemContainerViewModel) {

            this._itemContainerViewModel = new ItemContainerViewModel
            (
                this._apiClient!,
                this._eventBus,
                this._apiViewEvents,
            );
        }

        return this._itemContainerViewModel;
    }

    public reloadMainView(): void {
        this._eventBus.emit(EventNames.ReloadMainView, null, new ReloadMainViewEvent());
    }

    private _setupCallbacks() {
        this.reloadMainView = this.reloadMainView.bind(this);
    }



}
