/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import React, {useEffect, useState} from "react";
import {EventNames} from "../../events/EventNames";
import {NavigateEvent} from "../../events/NavigateEvent";
import {ReloadMainViewEvent} from "../../events/ReloadMainViewEvent";
import {SetErrorEvent} from "../../events/SetErrorEvent";
import {UIError} from "../../errors/UiError";
import {Rental} from "../../api/entities/Rental";
import {RentalSort} from "../../api/enums/RentalSort";
import {ItemState} from "./ItemState";
import {ItemProps} from "./ItemProps";
import NonReturnableItemView from "./NonReturnableItemView";
import {useParams} from "react-router-dom";
import {Item} from "../../api/entities/Item";
import {ItemView} from "../../api/entities/ItemView";

function ItemContainer(props: ItemProps): JSX.Element {

    const model = props.viewModel;
    const {itemId} = useParams();
    const [state, setState] = useState<ItemState>({
        item: null,
        rentals: [],
        hasMore: true,
        entities: null
    });

    useEffect(()=>{
        startup();
        return ()=>cleanup();
    },[]);

    async function startup(): Promise<void> {
        model.eventBus.emit(EventNames.Navigate, null, new NavigateEvent(false));

        model.eventBus.on(EventNames.ReloadMainView, onReload);

        await loadData();
    }

    function cleanup(): void {
        model.eventBus.detach(EventNames.ReloadMainView, onReload);
    }

    async function onReload(event: ReloadMainViewEvent): Promise<void> {
        await loadData();
    }

    async function loadData(search="", offset=0, sort:RentalSort=RentalSort.DATE): Promise<void> {

        //todo laduje za kazdym razem wszystko zamiast doladowywac, do zmiany, bo zmula
        const onSuccess = (rentals: Rental[], item: ItemView, entities: Item[] | null) => {
            if(rentals.length<10)
                setState((s)=>({...s, hasMore:false}));
            setState((s) => {
                return {
                    ...s,
                    rentals: s.rentals.concat(rentals),
                    item: item,
                    entities: entities
                };
            });

        };

        const onError = (error: UIError) => {
            model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('item', error));
            setState((s) => {
                return {
                    ...s,
                    rentals: [],
                    item: null,
                    entities: null
                };
            });
        };
        if(offset===0)
            setState((s)=>({...s, rentals:[], hasMore:true}));

        model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('item', null));
        await model.callApi(onSuccess, onError, itemId, search, offset, sort);
    }

    const childProps = {
        item: state.item,
        rentals: state.rentals,
        onReload: loadData,
        hasMore: state.hasMore,
        entities: state.entities
    };

    if(state.item===null){
        return(<div>item null</div>);
    }
    else if(state.entities!=null){
        return (<div>returnable byczq</div>);
    }
    else{
        return (<NonReturnableItemView {...childProps}/>);
    }
}

export default ItemContainer;
