/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import styles from "../../styles/Nav.module.scss";
import {Link, useLocation} from 'react-router-dom';
import React, {useCallback, useEffect, useRef, useState} from "react";
import {NavComponentProps} from "./NavComponentProps";

//todo poprawic to gowno
function NavComponent(props:NavComponentProps):JSX.Element {


    const location = useLocation();

    const sidebarRef = useRef<any>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(300);

    const startResizing = useCallback((mouseDownEvent) => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
        if(sidebarRef.current!=null && !isNaN(sidebarRef.current.scrollWidth))
            props.ipcEvents.setToStore("settings.navWidth",sidebarRef.current.scrollWidth.toString());
    }, []);

    const resize = useCallback(
        (mouseMoveEvent) => {
            if (isResizing&&sidebarRef.current!=null) {
                setSidebarWidth(
                    mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
                );
            }
        },[isResizing]);

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    useEffect(() => {
        if(props.configuration)
            setSidebarWidth(props.configuration.settings.navWidth);
    }, []);

    return (
        <nav
            ref={sidebarRef}
            className={styles.mainBox}
            style={{ width: sidebarWidth }}
            onMouseDown={(e) => e.preventDefault()}>

            <div className={styles.logo}>Storely</div>

            <ul className={styles.list}>
                <li><Link to="/" className={styles.linkBox}>Strona główna</Link></li>
                <li><Link to="/shortages" className={styles.linkBox}>Deficyt</Link></li>
                <li><Link to="/items" className={styles.linkBox}>Przedmioty</Link></li>
                <li><Link to="users" className={styles.linkBox}>Użytkownicy</Link></li>
                <li><Link to="returnable-rentals" className={styles.linkBox}>Wydania zwrotne</Link></li>
                <li><Link to="nonreturnable-rentals" className={styles.linkBox}>Wydania bezzwrotne</Link></li>
                <li><Link to="/item/2" className={styles.linkBox}>item test</Link></li>


            </ul>

            <Link to="settings" className={styles.linkBox}>Ustawienia</Link>

            <div className={styles.appSidebarResizer} onMouseDown={startResizing}/>

        </nav>
    );
}

export default NavComponent;
