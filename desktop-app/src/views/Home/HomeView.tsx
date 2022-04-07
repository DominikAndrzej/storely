/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import MediumWidget from '../../items/MediumWidget';
import React from 'react';
import HomeChartComponent from "./HomeChartComponent";

import styles from '../../styles/Home.module.scss';
import {HomeViewProps} from "./HomeViewProps";
import {Shortage} from "../../api/entities/Shortage";

function Home(props:HomeViewProps) {

    function renderItem(shortage: Shortage, key: number){
        return(
            <tr className={styles.main} key={key}>
                <td>{shortage.name}</td>
                <td>{`${shortage.quantity}   /   ${shortage.criticalQuantity}`}</td>
                <td>{shortage.averageRentals}</td>
                <td>{Math.round(shortage.cover * 100)}%</td>
            </tr>
        );
    }
    
    return (
        <div className={styles.main}>
            <div className={styles.widgets}>
                <MediumWidget number={props.widgets != null ? props.widgets.rentalsToday : null}>Wypożyczenia dziś</MediumWidget>
                <MediumWidget number={props.widgets != null ? props.widgets.retrievalsToday : null}>Pobrania dziś</MediumWidget>
                <MediumWidget number={props.widgets != null ? props.widgets.returnsToday : null}>Zwroty dziś</MediumWidget>
                <MediumWidget number={props.widgets != null ? props.widgets.itemsAddedToday : null}>Nowych przedmiotów dziś</MediumWidget>
            </div>
            <div className={styles.dashboard}>
                <div className={styles.chart}>
                    <h3>Wypożyczenia w ciągu<br/> ostatnich 30 dni</h3>
                    <div>
                        <HomeChartComponent chart={props.rentalChart}/>
                    </div>
                </div>
                <div className={styles.chart}>
                    <h3>Pobrania w ciągu<br/> ostatnich 30 dni</h3>
                    <div>
                        <HomeChartComponent chart={props.retrievalChart}/>
                    </div>
                </div>
                <div className={styles.list}>
                    <h2>Deficyt</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>PRZEDMIOT</th>
                                <th>ILOŚĆ/POZIOM MINIMALNY</th>
                                <th>ŚREDNIA TYGODNIOWA WYPOŻYCZEŃ</th>
                                <th>POKRYCIE ILOŚCI MINIMALNEJ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.shortages.map((x, i)=>renderItem(x, i))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>

            </div>
        </div>

    );
}

export default Home;
