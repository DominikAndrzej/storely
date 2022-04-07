/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

export class HoursFormatter{

    static hoursToString(hours: number): string{
        const days = Math.floor(hours/24);
        const finalHours = hours%24;

        if(hours>24){
            return hours.toString()+"d";
        }
        else if(hours>720){
            return days.toString()+"d "+finalHours.toString()+"h";
        }
        else{
            return days.toString()+"d";
        }
    }
}
