import {Configuration} from "../configuration/Configuration";
import {BrowserWindow, ipcMain} from "electron";
import {IpcEventNames} from "./IpcEventNames";
import Opener from 'opener';
import {safeStorage} from "electron";
import stringMatching = jasmine.stringMatching;
import {ErrorFactory} from "../errors/ErrorFactory";
const Store = require("electron-store");

export class MainEvents{
    private _window : BrowserWindow | null;
    private _store : typeof Store | null ;

    public constructor() {
        this._window = null;
        this._store = null;
        this._setupCallbacks();
    }

    public set window(window: BrowserWindow) {
        this._window = window;
    }

    public set store(configuration: Configuration){
        const store = {
            token:"",
            store:configuration
        }
        if(this._store==null){
            this._store = new Store({defaults: store});
        }
        console.log(this._store.store);
    }

    public register(): void {
        ipcMain.on(IpcEventNames.ON_GET_CONFIGURATION, this._getConfiguration);
        ipcMain.on(IpcEventNames.ON_OPEN_SYSTEM_BROWSER, this._openSystemBrowser);
        ipcMain.on(IpcEventNames.ON_SAVE_TO_STORE, this._saveToStore);
        ipcMain.on(IpcEventNames.ON_DELETE_TOKEN, this._deleteToken);
        ipcMain.on(IpcEventNames.ON_SAVE_TOKEN, this._saveToken);
        ipcMain.on(IpcEventNames.ON_LOAD_TOKEN, this._getToken);

    }

    private async _saveToStore(event:any, {name, value}:any): Promise<void> {
        if(value!==undefined && value.length>0)
            this._store.set(`store.${name}`, value);

        this._sendResponse(IpcEventNames.ON_SAVE_TO_STORE, null, null);
    }


    private async _getConfiguration(): Promise<void> {
        this._sendResponse(IpcEventNames.ON_GET_CONFIGURATION, this._store.get("store"), null);

    }

    private async _getToken(): Promise<void> {
        const tokenBuffer:Buffer = Buffer.from(this._store.get("token"), "base64");
        console.log("buffer",tokenBuffer)
        if(tokenBuffer){
            try {
                console.log("XD1")
                //console.log("11",Object.entries(safeStorage.decryptString(Buffer.from("djEw4K4Pu/mLMLb16q6qsjn4XQ==",'base64'))))
               //console.log(safeStorage.decryptString(Buffer.from(safeStorage.encryptString("token").toString("base64"), 'base64')))
                //console.log(safeStorage.decryptString(tokenBuffer).toString())
                //this._sendResponse(IpcEventNames.ON_LOAD_TOKEN, token, null);
                this._sendResponse(IpcEventNames.ON_LOAD_TOKEN, safeStorage.decryptString(tokenBuffer), null);
            }
            catch(e){
                console.log(e)
                //this._store.delete("token");
                this._sendResponse(IpcEventNames.ON_LOAD_TOKEN, "", null);
            }
        }
        else{
            this._sendResponse(IpcEventNames.ON_LOAD_TOKEN, "", null);
        }

    }

    private async _saveToken(event:any, value:any): Promise<void> {
        console.log("value",value)
        if(value!=undefined && value.length>0 )
            this._store.set("token", safeStorage.encryptString(value).toString('base64'));
        this._sendResponse(IpcEventNames.ON_SAVE_TOKEN, null, null);
    }

    private async _deleteToken(): Promise<void> {
        this._store.delete("token");
        this._sendResponse(IpcEventNames.ON_DELETE_TOKEN, null, null);
    }

    private _openSystemBrowser(...args: any[]): void {

        try {

            Opener(args[1]);
            this._sendResponse(IpcEventNames.ON_OPEN_SYSTEM_BROWSER, null, null);

        } catch (e) {

            this._sendResponse(IpcEventNames.ON_OPEN_SYSTEM_BROWSER, null, e);
        }
    }

    private _sendResponse(eventName: string, data: any, error: any) {
        this._window!.webContents.send(eventName, {data, error});
    }


    private _setupCallbacks() {
        this._getConfiguration = this._getConfiguration.bind(this);
        this._saveToStore = this._saveToStore.bind(this);
        this._deleteToken = this._deleteToken.bind(this);
        this._saveToken = this._saveToken.bind(this);
        this._getToken = this._getToken.bind(this);
        this._openSystemBrowser = this._openSystemBrowser.bind(this);
    }

}