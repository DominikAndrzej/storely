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
import {ItemsViewState} from "./ItemsViewState";
import {ItemsViewProps} from "./ItemsViewProps";
import InfiniteScroll from "react-infinite-scroller";
import {ItemSort} from "../../api/enums/ItemSort";
import {ItemView} from "../../api/entities/ItemView";

function ItemsView(props:ItemsViewProps):JSX.Element {

    const [state, setState] = useState<ItemsViewState>({
        offset: 0,
        text:"",
        sortBy:ItemSort.ADDED,
        isLoading:false
    });

    async function reload(value:string){
        if(!state.isLoading) {
            await setState((prevState) => ({...prevState, offset: 0, text: value, isLoading: true}));
            await props.onReload(value, 0, state.sortBy);
            setState((prevState) => ({...prevState, isLoading: false}));
        }
    }

    async function reload_sort(value:ItemSort){
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


    function renderItem(item:ItemView, key:number){
        return(
            <tr className={styles.item} key={key}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>21</td>
                <td>{item.category.name}</td>
                <td>{item.returnable ? "zwrotne" : "bezzwrotne"}</td>
            </tr>);
    }

    const sortSwitchValues = [
        {
            value:"data",
            enum:ItemSort.ADDED
        },
        {
            value:"nazwa",
            enum:ItemSort.NAME
        },
        {
            value:"ilość",
            enum:ItemSort.QUANTITY
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
                                <th>Nazwa</th>
                                <th>Ilość</th>
                                <th>Średnia tygodniowa wydań</th>
                                <th>Kategoria</th>
                                <th>Rodzaj</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.items.map((item, key) => renderItem(item, key))}
                        </tbody>

                    </table>
                </InfiniteScroll>

            </div>
        </div>

    );
}

export default ItemsView;
