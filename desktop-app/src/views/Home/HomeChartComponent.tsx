/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import Chart from 'chart.js/auto';
import React, {useEffect, useRef} from 'react';
import colorLib from '@kurkle/color';
import styles from "../../styles/HomeChartComponent.module.scss";
import {HomeChartComponentProps} from "./HomeChartComponentProps";

function HomeChartComponent(props:HomeChartComponentProps) {

    const chart = useRef<HTMLCanvasElement | null>(null);
    
    function transparentize(value:any, opacity:any) {
        const alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return colorLib(value).alpha(alpha).rgbString();
    }


    function colorize(opaque:any) {
        return (ctx:any) => {//TODO obliczanie
            const v = ctx.parsed.y;
            const c = v < 10 ? '#D60000'
                : v < 50 ? '#F46300'
                    : v < 100 ? '#0358B6'
                        : '#44DE28';

            return opaque ? c : transparentize(c, 1 - Math.abs(v / 150));
        };
    }

    let delayed: boolean;
    const config= {
        type: "bar",
        data: {
            datasets: [{
                data:props.chart
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio:false,
            plugins: {
                legend: false
            },
            elements: {
                bar: {
                    backgroundColor: colorize(false),
                    borderColor: colorize(true),
                    borderWidth: 2
                },
            },
            parsing: {
                xAxisKey: 'date',
                yAxisKey: 'amount'
            }




        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            },
        }
    };

    useEffect(() => {
        if(chart
            && chart.current
            && props.chart!=[]
            && props.chart!=undefined
            && props.chart.length>0){
            console.log("XD");
            const myChart1 = new Chart(chart.current, config as any);
        }
    });


    return (
        <canvas className = {styles.main} ref={chart}>oups... unknown error :(</canvas>
    );
}

export default HomeChartComponent;
