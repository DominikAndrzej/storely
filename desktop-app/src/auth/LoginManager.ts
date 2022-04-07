import {RendererEvents} from "../ipc/RendererEvents";
import axios, {AxiosRequestConfig, Method} from "axios";
import {ErrorFactory} from "../errors/ErrorFactory";

export class LoginManager {

    private readonly _events : RendererEvents;
    private readonly _url : string;


    constructor(events: RendererEvents, url: string) {
        this._events = events;
        this._url = url;
    }

    public async login(email:string, password:string): Promise<void> {

        return new Promise<void>(async (resolve, reject) => {

            try {
                await this._startLogin(resolve, reject, email, password);

            } catch (e) {

                reject(e);
            }
        });
    }


    private async _startLogin(onSuccess: () => void, onError: (e: any) => void, email:string, password:string): Promise<void> {

        const body = {
            "username":email,
            "password":password
        }

        const url = `${this._url}login`;
        console.log(url);
        const method = "POST" as Method;

        const axiosOptions: AxiosRequestConfig = {
            url,
            method,
            headers:{},
            data:body,
        }
        try{
            console.log("axio")
            console.log(body)
            const response = await axios.request(axiosOptions);
            console.log(response)
            await this._events.setToken(response.data.token);
            onSuccess();

        }
        catch(e){
            console.log("err:(((")
            onError(e);
            if(this._is403Error(e)){
                throw ErrorFactory.fromApiError(e, url);
            }

            throw ErrorFactory.fromApiError(e, url);


        }

    }

    private _is403Error(error:any){
        return error.response && error.response.status === 403;
    }

}