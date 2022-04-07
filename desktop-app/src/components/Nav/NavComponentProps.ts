import {RendererEvents} from "../../ipc/RendererEvents";
import {Configuration} from "../../configuration/Configuration";

export interface NavComponentProps{
    ipcEvents:RendererEvents;
    configuration:Configuration | null;
}