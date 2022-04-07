/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import styles from '../../styles/Rental.module.scss';
import MediumWidget from "../../items/MediumWidget";
import SearchComponent from "../../components/Search/SearchComponent";
import SortSwitchComponent from "../../components/SortSwitch/SortSwitchComponent";
import React, {useState} from "react";
import {NonReturnableRentalsViewState} from "./NonReturnableRentalsViewState";
import {NonReturnableRentalsViewProps} from "./NonReturnableRentalsViewProps";
import InfiniteScroll from "react-infinite-scroller";
import {RentalSort} from "../../api/enums/RentalSort";
import {Rental} from "../../api/entities/Rental";

function NonReturnableRentalsView(props:NonReturnableRentalsViewProps):JSX.Element {

    const [state, setState] = useState<NonReturnableRentalsViewState>({
        offset: 0,
        text: "",
        sortBy: RentalSort.DATE,
        isLoading: false
    });

    async function reload(value: string){
        if(!state.isLoading) {
            await setState((prevState) => ({...prevState, offset: 0, text: value, isLoading: true}));
            await props.onReload(value, 0, state.sortBy);
            setState((prevState) => ({...prevState, isLoading: false}));
        }
    }

    async function reload_sort(value: RentalSort){
        if(!state.isLoading){
            await setState((prevState) => ({...prevState, offset: 0, sortBy: value, isLoading: true}));
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


    function renderItem(rental: Rental, key: number){
        const rentDate = new Date(rental.rentDate).toLocaleString();

        return(
            <tr className={styles.rental} key={key}>
                <td>{rental.item.itemTemplate.name}</td>
                <td>{rental.user.name +" "+rental.user.surname}</td>
                <td>{rental.user.group.name}</td>
                <td>{rental.quantity}</td>
                <td>{rentDate}</td>
            </tr>);
    }

    const sortSwitchValues = [
        {
            value:"data",
            enum:RentalSort.DATE
        },
        {
            value:"ilość",
            enum:RentalSort.QUANTITY
        },
        {
            value:"pozostały czas",
            enum:RentalSort.REMAINING
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
                                <th>Przedmiot</th>
                                <th>Użytkownik</th>
                                <th>Grupa</th>
                                <th>Ilość</th>
                                <th>Pobrano</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.rentals.map((item, key) => renderItem(item, key))}
                        </tbody>

                    </table>
                </InfiniteScroll>

            </div>
        </div>

    );
}

export default NonReturnableRentalsView;
