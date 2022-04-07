import fs from 'fs-extra';
import {Configuration} from './Configuration';


export class ConfigurationLoader {

    public static load(configFilePath: string): Configuration {

        const configurationBuffer = fs.readFileSync(configFilePath);
        return JSON.parse(configurationBuffer.toString());
    }
}