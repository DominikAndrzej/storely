/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import {UsersContainerState} from "./UsersContainerState";
import React, {useEffect, useState} from "react";
import {EventNames} from "../../events/EventNames";
import {NavigateEvent} from "../../events/NavigateEvent";
import {UsersContainerProps} from "./UsersContainerProps";
import {ReloadMainViewEvent} from "../../events/ReloadMainViewEvent";
import {SetErrorEvent} from "../../events/SetErrorEvent";
import UsersView from "./UsersView";
import {UIError} from "../../errors/UiError";
import {User} from "../../api/entities/User";
import {UserSort} from "../../api/enums/UserSort";

function UsersContainer(props: UsersContainerProps): JSX.Element {

    const model = props.viewModel;
    const [state, setState] = useState<UsersContainerState>({
        users:[],
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

    async function loadData(search="", offset=0, sort:UserSort=UserSort.ADDED): Promise<void> {

        const onSuccess = (users: User[]) => {
            if(users.length<10)
                setState((s)=>({...s, hasMore:false}));
            setState((s) => {
                return {
                    ...s,
                    users: s.users.concat(users)
                };
            });
        };

        const onError = (error: UIError) => {

            model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('users', error));
            setState((s) => {
                return {
                    ...s,
                    users: [],
                };
            });
        };
        if(offset===0)
            setState((s)=>({...s, users:[], hasMore:true}));

        model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('users', null));
        await model.callApi(onSuccess, onError, search, offset, sort);
    }



    const childProps = {
        users: state.users,
        onReload: loadData,
        hasMore: state.hasMore
    };

    return (
        <UsersView {...childProps}/>
    );
}

export default UsersContainer;
