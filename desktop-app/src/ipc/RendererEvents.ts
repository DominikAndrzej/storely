import urlparse from "url-parse";
import {IpcEventNames} from "./IpcEventNames";
import {Configuration} from "../configuration/Configuration";

export class RendererEvents{

    private readonly _api:any;

    public constructor() {
        this._api=(window as any).api;
    }

    public async loadConfiguration(): Promise<Configuration> {

        return this._sendIpcMessage(IpcEventNames.ON_GET_CONFIGURATION, {});
    }


    public async setToStore(name:string, value:any): Promise<void> {

        return this._sendIpcMessage(IpcEventNames.ON_SAVE_TO_STORE, {name, value});
    }

    public async getToken(): Promise<string> {

        return this._sendIpcMessage(IpcEventNames.ON_LOAD_TOKEN, {});
    }


    public async setToken(value:string): Promise<void> {
        return this._sendIpcMessage(IpcEventNames.ON_SAVE_TOKEN, value);
    }

    public async deleteToken(): Promise<void> {

        return this._sendIpcMessage(IpcEventNames.ON_DELETE_TOKEN, {});
    }

    private async _sendIpcMessage(eventName: string, requestData: any): Promise<any> {

        const result = await this._api.sendIpcMessage(eventName, requestData);
        if (result.error) {
            throw result.error;
        }

        return result.data;
    }




    private _tryParseUrl(url: string): any {

        try {
            return urlparse(url, true);
        } catch (e) {
            return null;
        }
    }

}