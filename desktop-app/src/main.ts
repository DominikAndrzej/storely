/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {app, BrowserWindow, Menu, session, shell} from "electron";
import DefaultMenu from "electron-default-menu";
import {ConfigurationLoader} from "./configuration/ConfigurationLoader";
import {Configuration} from "./configuration/Configuration";
import {MainEvents} from "./ipc/MainEvents";
//eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
//eslint-disable-next-line @typescript-eslint/no-var-requires
const isDev = require('electron-is-dev');

class Main {
    private _window:  BrowserWindow | null;
    private _ipcEvents: MainEvents;
    private _configuration: Configuration | null;

    public constructor() {
        this._window = null;
        this._ipcEvents = new MainEvents();
        this._configuration = null;
        this._setupCallbacks();
    }

    public execute(): void {

        const primaryInstance = app.requestSingleInstanceLock();
        if (!primaryInstance) {
            app.quit();
            return;
        }

        console.info('STARTING ELECTRON MAIN PROCESS');

        //app.on('second-instance', this._onSecondInstance);

        // Initialise the primary instance of the application
        this._initializeApplication();
    }

    private _initializeApplication(): void {

        const configurationBuffer = ConfigurationLoader.load("./store.default.json");

        this._ipcEvents.store = configurationBuffer;
        app.on('ready', this._onReady);

        app.on('window-all-closed', this._onAllWindowsClosed);

        app.on('activate', this._onActivate);


        // app.on('open-url', this._onOpenUrl);
        //
        // const startupUrl = this._getDeepLinkUrl(process.argv);
        // if (startupUrl) {
        //     this._ipcEvents.deepLinkStartupUrl = startupUrl;
        // }
    }

    private _onReady(): void {

        this._window = new BrowserWindow({
            width: 1200,
            height: 800,
            minWidth: 800,
            minHeight: 500,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(app.getAppPath(), './preload.js'),
            },
        });

        this._ipcEvents.window = this._window;

        //this._registerPrivateUriScheme();

        const menu = DefaultMenu(app, shell);
        Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

        // this._window.loadURL(
        //     isDev
        //         ? 'http://localhost:3000'
        //         : `file://${path.join(__dirname, '../build/index.html')}`
        // )

        this._window.loadFile('./index.html');

        this._initialiseOutgoingHttpRequestHeaders();

        this._window.on('closed', this._onClosed);

        this._ipcEvents.register();

        // this._window.webContents.openDevTools();
    }

    private _onActivate(): void {

        //if (BrowserWindow.getAllWindows().length === 0) createWindow();

        if (this._window === null) {
            this._onReady();
        }
        //if (BrowserWindow.getAllWindows().length === 0) createWindow();
    }


    private _initialiseOutgoingHttpRequestHeaders() {

        const headerCallback = (details: any, callback: any) => {

            if (details.requestHeaders.Origin) {
                delete details.requestHeaders.Origin;
            }

            callback({cancel: false, requestHeaders: details.requestHeaders});
        };
        session.defaultSession.webRequest.onBeforeSendHeaders({urls: []} as any, headerCallback);
    }



    private _onClosed(): void {
        this._window = null;
    }

    private _onAllWindowsClosed(): void {

        if (process.platform !== 'darwin') {
            app.quit();
        }
    }


    private _setupCallbacks() {
        this._onReady = this._onReady.bind(this);
        this._onActivate = this._onActivate.bind(this);
        this._onClosed = this._onClosed.bind(this);
        this._onAllWindowsClosed = this._onAllWindowsClosed.bind(this);
    }
}

try {
    const main = new Main();
    main.execute();

} catch (e) {

    console.log(e);
    app.exit();
}



/*

    const settingsConfiguration:SettingsConfiguration={
        darkMode:false,
        navWidth:300
    };
    const apiConfiguration:ApiConfiguration={
        url:"http://localhost:3000/",
        token:null
    };


    const defaults:Configuration = {
        api:apiConfiguration,
        settings:settingsConfiguration
    } as Configuration;



    const store = new Store({defaults});

    ipcMain.on('store-set', (event:any, {name, value}:any) => {
    store.set(name, value);
    event.returnValue=0;
});

ipcMain.on('store-get', (event:any, name:any) => {
    //event.returnValue = 1;
    event.returnValue = store.get(name, undefined);
});

//require('@electron/remote/main').initialize()

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth:600,
        minHeight:400,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation:true,
            worldSafeExecuteJavaScript:true,
            preload:path.join(app.getAppPath(), "./preload.js")
        }
    })

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
})

app.on('open-url', function(event:any, schemeData:string){
    event.preventDefault();

    if (win) {
        this._receiveNotificationInRunningInstance(schemeData);
    } else {
        this._ipcEvents.deepLinkStartupUrl = schemeData;
    }
})

}
}
*/
