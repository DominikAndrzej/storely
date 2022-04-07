/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {NonReturnableRentalsContainerState} from "./NonReturnableRentalsContainerState";
import React, {useEffect, useState} from "react";
import {EventNames} from "../../events/EventNames";
import {NavigateEvent} from "../../events/NavigateEvent";
import {NonReturnableRentalsContainerProps} from "./NonReturnableRentalsContainerProps";
import {ReloadMainViewEvent} from "../../events/ReloadMainViewEvent";
import {SetErrorEvent} from "../../events/SetErrorEvent";
import NonReturnableRentalsView from "./NonReturnableRentalsView";
import {UIError} from "../../errors/UiError";
import {Rental} from "../../api/entities/Rental";
import {RentalSort} from "../../api/enums/RentalSort";

function NonReturnableRentalsContainer(props: NonReturnableRentalsContainerProps): JSX.Element {

    const model = props.viewModel;
    const [state, setState] = useState<NonReturnableRentalsContainerState>({
        rentals: [],
        hasMore: true
    });

    useEffect(()=>{
        startup();
        return ()=>cleanup();
    },[]);

    async function startup(): Promise<void> {

        model.eventBus.emit(EventNames.Navigate, null, new NavigateEvent(true));

        model.eventBus.on(EventNames.ReloadMainView, onReload);

        //await loadData();
    }

    function cleanup(): void {
        model.eventBus.detach(EventNames.ReloadMainView, onReload);
    }


    async function onReload(event: ReloadMainViewEvent): Promise<void> {
        await loadData();
    }

    async function loadData(search="", offset=0, sort:RentalSort=RentalSort.DATE): Promise<void> {

        const onSuccess = (rentals: Rental[]) => {
            if(rentals.length<10)
                setState((s)=>({...s, hasMore:false}));
            setState((s) => {
                return {
                    ...s,
                    rentals: s.rentals.concat(rentals)
                };
            });
        };

        const onError = (error: UIError) => {

            model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('rentals', error));
            setState((s) => {
                return {
                    ...s,
                    rentals: [],
                };
            });
        };
        if(offset===0)
            setState((s)=>({...s, rentals:[], hasMore:true}));

        model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('rentals', null));
        await model.callApi(onSuccess, onError, search, offset, sort);
    }



    const childProps = {
        rentals: state.rentals,
        onReload: loadData,
        hasMore: state.hasMore
    };

    return (
        <NonReturnableRentalsView {...childProps}/>
    );
}

export default NonReturnableRentalsContainer;
