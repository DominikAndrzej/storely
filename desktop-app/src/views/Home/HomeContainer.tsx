/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import React, {useEffect, useState} from 'react';


import HomeView from "./HomeView";
import {EventNames} from "../../events/EventNames";
import {NavigateEvent} from "../../events/NavigateEvent";
import {ReloadMainViewEvent} from "../../events/ReloadMainViewEvent";
import {UIError} from "../../errors/UiError";
import {SetErrorEvent} from "../../events/SetErrorEvent";
import {HomeContainerProps} from "./HomeContainerProps";
import {HomeContainerState} from "./HomeContainerState";
import {HomeWidgets} from "../../api/entities/HomeWidgets";
import {ChartBar} from "../../api/entities/ChartBar";
import {Shortage} from "../../api/entities/Shortage";

function HomeContainer(props:HomeContainerProps) {


    const model = props.viewModel;
    const [state, setState] = useState<HomeContainerState>({
        widgets:null,
        rentalChart:[],
        retrievalChart:[],
        shortages:[]
    });

    useEffect(()=>{
        startup();
        return ()=>cleanup();
    },[]);

    async function startup(): Promise<void> {

        model.eventBus.emit(EventNames.Navigate, null, new NavigateEvent(true));

        model.eventBus.on(EventNames.ReloadMainView, onReload);

        await loadData();
    }

    function cleanup(): void {
        model.eventBus.detach(EventNames.ReloadMainView, onReload);
    }


    async function onReload(event: ReloadMainViewEvent): Promise<void> {
        await loadData();
    }

    async function loadData(): Promise<void> {

        const onSuccess = (widgets:HomeWidgets, rentalChart:ChartBar[], retrievalChart:ChartBar[], shortages: Shortage[]) => {
            setState((s) => {
                return {
                    ...s,
                    widgets:widgets,
                    rentalChart:rentalChart,
                    retrievalChart:retrievalChart,
                    shortages: shortages
                };
            });
        };

        const onError = (error: UIError) => {

            model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('main', error));
            setState((s) => {
                return {
                    ...s,
                    widgets: null,
                    rentalChart: [],
                    retrievalChart: [],
                    shortages: []
                };
            });
        };

        model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('main', null));
        await model.callApi(onSuccess, onError);
    }



    const childProps = {
        widgets: state.widgets,
        rentalChart: state.rentalChart,
        retrievalChart: state.retrievalChart,
        shortages: state.shortages
    };


    return (
        <HomeView {...childProps}/>
    );
}

export default HomeContainer;
