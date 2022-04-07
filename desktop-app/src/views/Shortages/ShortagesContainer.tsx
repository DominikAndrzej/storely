/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */
import React, {useEffect, useState} from "react";
import {EventNames} from "../../events/EventNames";
import {NavigateEvent} from "../../events/NavigateEvent";
import {ReloadMainViewEvent} from "../../events/ReloadMainViewEvent";
import {UIError} from "../../errors/UiError";
import {SetErrorEvent} from "../../events/SetErrorEvent";
import ShortagesView from "./ShortagesView";
import {ShortagesContainerProps} from "./ShortagesContainerProps";
import {ShortagesContainerState} from "./ShortagesContainerState";
import {ShortageSort} from "../../api/enums/ShortageSort";
import {Shortage} from "../../api/entities/Shortage";

function ShortagesContainer(props: ShortagesContainerProps): JSX.Element {

    const model = props.viewModel;
    const [state, setState] = useState<ShortagesContainerState>({
        shortages:[],
        hasMore:true
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

    async function loadData(search="", offset=0, sort:ShortageSort=ShortageSort.ADDED): Promise<void> {

        const onSuccess = (shortages: Shortage[]) => {
            if(shortages.length<10)
                setState((s)=>({...s, hasMore:false}));
            setState((s) => {
                return {
                    ...s,
                    shortages:s.shortages.concat(shortages)
                };
            });
        };

        const onError = (error: UIError) => {

            model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('shortages', error));
            setState((s) => {
                return {
                    ...s,
                    shortages: [],
                };
            });
        };

        if(offset===0)
            setState((s)=>({...s, shortages:[], hasMore:true}));

        model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('shortages', null));
        await model.callApi(onSuccess, onError, search, offset, sort);
    }



    const childProps = {
        shortages: state.shortages,
        onReload: loadData,
        hasMore: state.hasMore
    };


    return (
        <ShortagesView {...childProps}/>
    );
}

export default ShortagesContainer;
