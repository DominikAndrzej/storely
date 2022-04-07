/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import React, {useState} from 'react';
import styles from '../../styles/Item.module.scss';

import {NonReturnableItemViewProps} from "./NonReturnableItemViewProps";
import {Group} from "../../api/entities/Group";
import {useNavigate} from "react-router";
import SearchComponent from "../../components/Search/SearchComponent";
import SortSwitchComponent from "../../components/SortSwitch/SortSwitchComponent";
import InfiniteScroll from "react-infinite-scroller";
import {RentalSort} from "../../api/enums/RentalSort";
import {Rental} from "../../api/entities/Rental";
import {NonReturnableItemViewState} from "./NonReturnableItemViewState";

function NonReturnableItemView(props: NonReturnableItemViewProps): JSX.Element|null {

    const navigate = useNavigate();


    const [state, setState] = useState<NonReturnableItemViewState>({
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

    function renderGroup(element: Group, i: number){
        return <div key={i}>{element.name}</div>;
    }

    if(props.item===null)
        return null;

    return (
        <div className={styles.main}>
            <nav className={styles.nav}>
                <div className={styles.back} onClick={()=>navigate(-1)}>Powrót</div>
                <h1>{props.item.name}</h1>
                <div className={styles.buttons}>
                    <button>Usuń</button>
                    <button>Edytuj</button>
                </div>
            </nav>
            <div className={styles.content}>
                <div className={styles.sideBar}>
                    <div className={styles.stats}>
                        <div className={styles.backgroundHeader}></div>
                        <div className={styles.header}>
                            <h2>Ilość</h2>
                            <h1>{props.item.quantity}</h1>
                        </div>
                        <h3>Dane przedmiotu</h3>
                        <div className={styles.itemData}>
                            <div className={styles.dataName}>Nazwa</div>
                            <div>{props.item.name}</div>
                            <hr/>
                            <div className={styles.dataName}>Model</div>
                            <div>{props.item.model}</div>
                            <hr/>
                            <div className={styles.dataName}>Kategoria</div>
                            <div>{props.item.category.name}</div>
                            <hr/>
                            <div className={styles.dataName}>Ilość krytyczna</div>
                            <div>{props.item.criticalQuantity}</div>
                            <hr/>
                            <div className={styles.dataName}>Ostatnia dostawa</div>
                            <div>{props.item.added}</div>
                            <hr/>
                            <div className={styles.dataName}>Rodzaj</div>
                            <div>Bezzwrotne</div>
                        </div>
                        <h3>Opis</h3>
                        <div className={styles.itemData}>
                            <div>{props.item.description}</div>
                        </div>
                    </div>
                    <div className={styles.groups}>
                        <h3>Grupy</h3>
                        <div className={styles.list}>{props.item.groups.map((x,i)=>renderGroup(x, i))}</div>
                    </div>
                </div>
                <div className={styles.itemList}>
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
        </div>
    );
}

export default NonReturnableItemView;
