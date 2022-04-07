/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import './App.scss';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import NavComponent from "./components/Nav/NavComponent";
import LoginContainer from "./views/Login/LoginContainer";
import ItemsContainer from "./views/Items/ItemsContainer";
import ShortagesContainer from "./views/Shortages/ShortagesContainer";
import Settings from "./views/Settings/Settings";
import {AppProps} from "./AppProps";
import React, {useEffect, useState} from "react";
import {AppState} from "./AppState";
import {RouteHelper} from "./utilities/RouteHelper";
import {SetErrorEvent} from "./events/SetErrorEvent";
import {EventNames} from "./events/EventNames";
import UsersContainer from "./views/Users/UsersContainer";
import ReturnableRentalsContainer from "./views/ReturnableRentals/ReturnableRentalsContainer";
import NonReturnableRentalsContainer from "./views/NonReturnableRentals/NonReturnableRentalsContainer";
import ItemContainer from "./views/Item/ItemContainer";
import HomeContainer from "./views/Home/HomeContainer";
import {NavigateEvent} from "./events/NavigateEvent";


function App(props:AppProps) : JSX.Element {

    const model = props.viewModel;
    const [state, setState] = useState<AppState>({
        isInitialised: model.isInitialised,
        isMainView: true
    });

    useEffect(() => {
        startup();
        return () => cleanup();
    }, []);

    async function startup():Promise<void>{
        try{
            await model.initialise();
            setError(null);
            model.eventBus.on(EventNames.LoginRequired, onLoginRequired);
            model.eventBus.on(EventNames.Navigate, navigate);


            setState((s)=>{
                return{
                    ...s,
                    isInitialised:true
                };
            });
        }
        catch(e){
            console.log(e);
            setError(e);
        }
    }

    function cleanup(){
        model.eventBus.detach(EventNames.LoginRequired, onLoginRequired);
    }

    function onLoginRequired(): void {
        model.apiViewEvents.clearState();
        location.hash = '/login';
    }

    function navigate(e: NavigateEvent): void {
        setState((s)=>({...s, isMainView: e.isMainView}));
    }

    async function onHome ():Promise<void> {
        if(!state.isInitialised){
            cleanup();
            await startup();
        }

        if(state.isInitialised){
            if(RouteHelper.isInLoginRequiredView()){
                //const isLoggedIn = await model.authenticator.isLoggedIn();
                //await login();
                //return()
            }

            if(RouteHelper.isInHomeView()){
                model.reloadMainView();
            }
            else{
                window.location.hash = "#";
            }

        }
    }

    async function login ():Promise<void> {
        try{
            //pass
        }
        catch(e){
            setError(e);
        }
    }

    function setError(e:any):void{
        model.eventBus.emit(EventNames.SetError, null, new SetErrorEvent('main',e));
    }



    function renderInitialScreen(){
        return(<div>l o  a   d    i     n     g</div>);
    }

    function renderMain() {

        const itemsProps = {
            viewModel:model.getItemsViewModel()
        };

        const navProps = {
            ipcEvents:props.viewModel.ipcEvents,
            configuration:props.viewModel.configuration
        };

        const loginProps = {
            viewModel:model.getLoginViewModel()
        };

        const homeProps = {
            viewModel:model.getHomeViewModel()
        };

        const shortagesProps = {
            viewModel:model.getShortagesViewModel()
        };

        const usersProps = {
            viewModel:model.getUsersViewModel()
        };

        const returnableRentalsProps = {
            viewModel:model.getReturnableRentalsViewModel()
        };

        const nonReturnableRentalsProps = {
            viewModel:model.getNonReturnableRentalsViewModel()
        };

        const itemProps = {
            viewModel: model.getItemViewModel()
        };

        return (
            <Router>
                {state.isMainView && <NavComponent {...navProps}/>}
                <Routes>

                    <Route path="items" element={<ItemsContainer {...itemsProps}/>}/>
                    <Route path="shortages" element={<ShortagesContainer {...shortagesProps}/>}/>
                    <Route path="users" element={<UsersContainer {...usersProps}/>}/>
                    <Route path="returnable-rentals" element={<ReturnableRentalsContainer {...returnableRentalsProps}/>}/>
                    <Route path="nonreturnable-rentals" element={<NonReturnableRentalsContainer {...nonReturnableRentalsProps}/>}/>
                    
                    <Route path="login" element={<LoginContainer {...loginProps}/>}/>

                    <Route path="settings" element={<Settings/>}/>

                    <Route path="item/:itemId" element={<ItemContainer {...itemProps}/>}/>

                    <Route path="/" element={<HomeContainer {...homeProps}/>}/>
                    <Route path="*" element={<HomeContainer {...homeProps}/>}/>



                    {/*<Route path="/" element={<HomeContainer {...homeProps}/>}/>*/}
                    {/*<Route path="*" element={<HomeContainer {...homeProps}/>}/>*/}
                </Routes>
            </Router>
        );
    }
    if (!state.isInitialised) {
        return renderInitialScreen();
    } else {
        return renderMain();
    }

}

export default App;
