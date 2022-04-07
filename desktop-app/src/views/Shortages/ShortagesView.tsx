/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import styles from '../../styles/Shortages.module.scss';
import MediumWidget from '../../items/MediumWidget';
import React, {useState} from 'react';
import SortSwitchComponent from '../../components/SortSwitch/SortSwitchComponent';
import SearchComponent from '../../components/Search/SearchComponent';
import {ShortageSort} from "../../api/enums/ShortageSort";
import {ShortagesViewProps} from "./ShortagesViewProps";
import {ShortagesViewState} from "./ShortagesViewState";
import InfiniteScroll from "react-infinite-scroller";
import {Shortage} from "../../api/entities/Shortage";

function ShortagesView(props: ShortagesViewProps): JSX.Element {

    const [state, setState] = useState<ShortagesViewState>({
        offset: 0,
        text:"",
        sortBy:ShortageSort.ADDED,
        isLoading:false
    });

    async function reload(value:string){
        if(!state.isLoading) {
            await setState((prevState) => ({...prevState, offset: 0, text: value, isLoading: true}));
            await props.onReload(value, 0, state.sortBy);
            setState((prevState) => ({...prevState, isLoading: false}));
        }
    }

    async function reload_sort(value:ShortageSort){
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

    const sortSwitchValues = [
        {
            value:"data",
            enum:ShortageSort.ADDED
        },
        {
            value:"nazwa",
            enum:ShortageSort.NAME
        },
        {
            value:"ilość",
            enum:ShortageSort.QUANTITY
        },
        {
            value:"średnia",
            enum:ShortageSort.AVG
        },
        {
            value:"pokrycie",
            enum:ShortageSort.COVER
        },
        {
            value:"krytyczna",
            enum:ShortageSort.CRITICAL
        },

    ];
    
    function renderShortage(shortage: Shortage, key: number){
        const cover = shortage.cover>1?100:Math.round(shortage.cover*100);

        return(
            <tr className={styles.shortage} key={key}>
                <td>{shortage.name}</td>
                <td>{shortage.quantity}  /  {shortage.criticalQuantity}</td>
                <td>{shortage.averageRentals}</td>
                <td className={styles.barTd}>
                    <div className={styles.flex}>
                        <div>{cover}%</div>
                        <div className={styles.bar}>
                            <div className={styles.barRed}
                                style={{width:cover}}/>
                        </div>
                    </div>
                </td>

            </tr>);
    }

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
                    <h2>Przedmioty poniżej poziomu minimalnego</h2>
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
                                <th>Ilość / Poziom minimalny</th>
                                <th>Średnia tygodniowa wypożyczeń</th>
                                <th>Pokrycie ilości minimalnej</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.shortages.map((shortage, key) => renderShortage(shortage, key))}
                        </tbody>
                    </table>
                </InfiniteScroll>

            </div>
        </div>

    );
}

export default ShortagesView;
