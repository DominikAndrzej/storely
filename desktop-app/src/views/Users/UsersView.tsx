/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import styles from '../../styles/Items.module.scss';
import MediumWidget from "../../items/MediumWidget";
import SearchComponent from "../../components/Search/SearchComponent";
import SortSwitchComponent from "../../components/SortSwitch/SortSwitchComponent";
import React, {useState} from "react";
import {UsersViewState} from "./UsersViewState";
import {UsersViewProps} from "./UsersViewProps";
import InfiniteScroll from "react-infinite-scroller";
import {UserSort} from "../../api/enums/UserSort";
import {User} from "../../api/entities/User";

function UsersView(props: UsersViewProps):JSX.Element {

    const [state, setState] = useState<UsersViewState>({
        offset: 0,
        text:"",
        sortBy:UserSort.ADDED,
        isLoading:false
    });

    async function reload(value:string){
        if(!state.isLoading) {
            await setState((prevState) => ({...prevState, offset: 0, text: value, isLoading: true}));
            await props.onReload(value, 0, state.sortBy);
            setState((prevState) => ({...prevState, isLoading: false}));
        }
    }

    async function reload_sort(value:UserSort){
        if(!state.isLoading){
            await setState((prevState) => ({...prevState, offset: 0, sortBy:value, isLoading: true}));
            await props.onReload(state.text, state.offset, value);
            setState((prevState) => ({...prevState, isLoading: false}));
        }
    }


    async function loadMore(){
        if(!state.isLoading) {
            await setState((prevState) => ({...prevState, offset: prevState.offset + 10, isLoading: true}));
            await props.onReload(state.text, state.offset, state.sortBy);
            setState((prevState) => ({...prevState, isLoading: false}));
        }
    }


    function renderItem(user:User, key:number){
        return(
            <tr className={styles.item} key={key}>
                <td>{user.name} {user.surname}</td>
                <td>{user.email}</td>
                <td>{user.group != null ? user.group.name : null}</td>
                <td>{user.enabled === true ? "aktywne" : "nieaktywne"}</td>
                <td>{user.role}</td>
            </tr>);
    }

    const sortSwitchValues = [
        {
            value:"imię",
            enum:UserSort.NAME
        },
        {
            value:"nazwisko",
            enum:UserSort.SURNAME
        },
        {
            value:"dołączono",
            enum:UserSort.ADDED
        },

    ];


    return (
        <div className={styles.main}>
            <div className={styles.widgets}>
                <MediumWidget number={254}>Wypożyczenia dziś</MediumWidget>
                <MediumWidget number={1024}>Pobrania dziś</MediumWidget>
                <MediumWidget number={5555}>Zwroty dziś</MediumWidget>
                <MediumWidget number={5555}>Nowych przedmiotów dziś</MediumWidget>
            </div>
            <div className={styles.list}>
                <div className={styles.listHeader}>
                    <h2>Przedmioty w magazynie</h2>
                    <div className={styles.listHeaderFlex}>
                        <SearchComponent onChange={reload}/>
                        <SortSwitchComponent onChange={reload_sort} values={sortSwitchValues}/>
                    </div>
                </div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={props.hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                >
                    <table>
                        <thead>
                            <tr>
                                <th>Imię i naziwsko</th>
                                <th>email</th>
                                <th>grupa</th>
                                <th>status</th>
                                <th>rola</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.users.map((x, key) => renderItem(x, key))}
                        </tbody>

                    </table>
                </InfiniteScroll>

            </div>
        </div>

    );
}

export default UsersView;
