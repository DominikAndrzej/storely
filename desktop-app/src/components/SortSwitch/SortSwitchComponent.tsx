import styles from "../../styles/SortSwitch.module.scss";
//import {Store} from '../store/store';

import React, { useRef, useEffect } from 'react';
import {SortSwitchProps} from "./SortSwitchProps";

function SortSwitchComponent(props:SortSwitchProps) {

    const colorBox = useRef<any>(null);
    const valuesRef = useRef<any>(null);

    const onClick = (e:any, x:any) =>{
        console.log(e);
        if(colorBox!=null
      &&colorBox.current!=null){
            colorBox.current.style.left = e.target.offsetLeft + "px";
            colorBox.current.style.width = e.target.offsetWidth + "px";
            for (const item of valuesRef.current.children) {
                item.style.color="var(--switchText)";
            }
            props.onChange(x);

            e.target.style.color="var(--switchContrastText)";
        }
    };

    useEffect(()=>{
        colorBox.current.style.left = valuesRef.current.children[0].offsetLeft+"px";
        colorBox.current.style.width = valuesRef.current.children[0].offsetWidth+"px";
        valuesRef.current.children[0].style.color="var(--switchContrastText)";
    },[]);


    return (
        <div className={styles.main}>
            <div className={styles.values} ref={valuesRef}>
                {props.values.map((x:any,i:number)=><div className={styles.valueBox}
                    onClick={(e)=>onClick(e, x.enum)} key={i}>{x.value}</div>)}
            </div>
            <div ref={colorBox} className={styles.colorBox}></div>
        </div>
    );
}

export default SortSwitchComponent;
