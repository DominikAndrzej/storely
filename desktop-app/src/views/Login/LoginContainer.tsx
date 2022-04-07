/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import LoginView from "./LoginView";
import React, {useEffect, useState} from "react";
import {EventNames} from "../../events/EventNames";
import {NavigateEvent} from "../../events/NavigateEvent";
import {ReloadMainViewEvent} from "../../events/ReloadMainViewEvent";
import {UIError} from "../../errors/UiError";
import {SetErrorEvent} from "../../events/SetErrorEvent";
import {LoginContainerProps} from "./LoginContainerProps";
import {LoginContainerState} from "./LoginContainerState";

function LoginContainer(props:LoginContainerProps):JSX.Element {

    const model = props.viewModel;
    const [state, setState] = useState<LoginContainerState>({
        error:""
    });

    useEffect(()=>{
        startup();
        return ()=>cleanup();
    },[]);

    async function startup(): Promise<void> {

        model.eventBus.emit(EventNames.Navigate, null, new NavigateEvent(false));

        model.eventBus.on(EventNames.ReloadMainView, onReload);

    }

    function cleanup(): void {
        model.eventBus.detach(EventNames.ReloadMainView, onReload);
    }


    async function onReload(event: ReloadMainViewEvent): Promise<void> {

    }

    async function login(email:string, password:string): Promise<void> {

        const onSuccess = () => {
            window.location.hash = '#';
        };

        const onError = (error: UIError) => {

            model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('login', error));
            setState((s) => {
                return {
                    ...s,
                    error: "Zle dane logowania ;(",
                };
            });
        };

        model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('login', null));
        model.login(onSuccess, onError, email, password);
    }

    const childProps = {
        error:state.error,
        onLogin:login
    };

    return (
        <LoginView {...childProps}/>
    );
}

export default LoginContainer;
