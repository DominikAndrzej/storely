import {ApiConfiguration} from "../configuration/ApiConfiguration";
import {SettingsConfiguration} from "../configuration/SettingsConfiguration";

export class Store {

  private _isElectron:boolean=false;
  private readonly ipcRenderer:any;

  public constructor() {
    try{
      this.ipcRenderer=window.require('electron').ipcRenderer;
      this._isElectron=true;
    }
    catch{
      const settings:SettingsConfiguration = {
        darkMode:false,
        navWidth:300
      };
      const api:ApiConfiguration = {
        url:"localhost:3000/",
        token:""
      }

      const d = new Date();
      d.setTime(d.getTime() + (31*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();

      if(document.cookie==""){
        this.set("settings", settings.toString());
        this.set("api", api.toString());

      }
    }
  }
  public getIsElectron(){
    return this._isElectron;
  }

  public set(name:string, value:string):void{
    if(this._isElectron){
      this.ipcRenderer.sendSync('store-set', {name, value});
    }
    else{
      const d = new Date();
      d.setTime(d.getTime() + (31*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
  }

  public setToken(){
    if(this._isElectron){

    }
  }

  public get(name:string|undefined):string|undefined{
    if(this._isElectron){
      return this.ipcRenderer.sendSync('store-get', name);
    }
    else{
      let cname = name + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
          return c.substring(cname.length, c.length);
        }
      }
      return "";
    }
  }


}
