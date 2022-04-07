import {Authenticator} from "./Authenticator";
import {RendererEvents} from "../ipc/RendererEvents";
import {ErrorFactory} from "../errors/ErrorFactory";
import {ErrorCodes} from "../errors/ErrorCodes";
import {LoginManager} from "./LoginManager";
import EventBus from "js-event-bus";
import {EventNames} from "../events/EventNames";
import {NavigateEvent} from "../events/NavigateEvent";

export class AuthenticatorImpl implements Authenticator {

    private readonly _events: RendererEvents;
    private readonly _eventBus: EventBus;

    private readonly _url: string;
    private _token: string | null;

    public constructor(events: RendererEvents, eventBus:EventBus, url:string) {

        this._eventBus=eventBus;
        this._events = events;
        this._url = url;
        this._token = null;
    }


    public async initialise(): Promise<void> {
        this._token = await this._events.getToken();
    }


    public async isLoggedIn(): Promise<boolean> {

        this._token = await this._events.getToken();
        return !!this._token;
    }


    //zwraca token
    public async getAccessToken(): Promise<string> {

        // Load tokens from secure storage if required
        if (!this._token) {
            this._token = await this._events.getToken();
        }

        // Return the existing token if present
        if (this._token ) {
            return this._token;
        }

        this._eventBus.emit(EventNames.LoginRequired, null, new NavigateEvent(true));

        throw ErrorFactory.fromLoginRequired();
    }


    public async refreshToken(): Promise<string> {

        throw ErrorFactory.fromLoginRequired();
    }


    public async login(email:string, password:string): Promise<void> {

        const loginManager = new LoginManager(this._events, this._url);

        try {
            await loginManager.login(email, password);
        } catch (e) {
            throw ErrorFactory.fromLoginOperation(e, ErrorCodes.loginRequestFailed);
        }
    }


    public async logout(): Promise<void> {

        try {

            if (this._token) {
                this._token = null;
                await this._events.deleteToken();

            }

        } catch (e) {

            // Do error translation if required
            throw ErrorFactory.fromLogoutOperation(e, ErrorCodes.logoutRequestFailed);
        }
    }




}