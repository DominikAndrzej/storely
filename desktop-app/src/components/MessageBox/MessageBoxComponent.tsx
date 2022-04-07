/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */
import React from "react";
import {MessageBoxComponentProps} from "./MessageBoxComponentProps";
import styles from "../../styles/MessageBoxComponent.module.scss";

function MessageBoxComponent(props: MessageBoxComponentProps): JSX.Element{

    function close(){
        
    }

    function submit(){

    }

    return(
        <div className={styles.main}>
            <h2 className={styles.title}>{props.title}</h2>
            <div className={styles.content}>{props.content}</div>
            <div className={styles.buttons}>
                <button onClick={close}>OK</button>
                <button onClick={submit}>Anuluj</button>
            </div>
        </div>
    );
}

export default MessageBoxComponent;
