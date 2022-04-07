/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {ItemsContainerState} from "./ItemsContainerState";
import React, {useEffect, useState} from "react";
import {EventNames} from "../../events/EventNames";
import {NavigateEvent} from "../../events/NavigateEvent";
import {ItemsContainerProps} from "./ItemsContainerProps";
import {ReloadMainViewEvent} from "../../events/ReloadMainViewEvent";
import {SetErrorEvent} from "../../events/SetErrorEvent";
import ItemsView from "./ItemsView";
import {UIError} from "../../errors/UiError";
import {ItemSort} from "../../api/enums/ItemSort";
import {ItemView} from "../../api/entities/ItemView";

function ItemsContainer(props: ItemsContainerProps): JSX.Element {

    const model = props.viewModel;
    const [state, setState] = useState<ItemsContainerState>({
        items:[],
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

    async function loadData(search="", offset=0, sort:ItemSort=ItemSort.ADDED): Promise<void> {

        const onSuccess = (items: ItemView[]) => {
            if(items.length<10)
                setState((s)=>({...s, hasMore:false}));
            setState((s) => {
                return {
                    ...s,
                    items:s.items.concat(items)
                };
            });
        };

        const onError = (error: UIError) => {

            model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('items', error));
            setState((s) => {
                return {
                    ...s,
                    items: [],
                };
            });
        };
        if(offset===0)
            setState((s)=>({...s, items:[], hasMore:true}));

        model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('items', null));
        await model.callApi(onSuccess, onError, search, offset, sort);
    }



    const childProps = {
        items: state.items,
        onReload: loadData,
        hasMore: state.hasMore
    };

    return (
        <ItemsView {...childProps}/>
    );
}

export default ItemsContainer;
