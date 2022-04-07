/*
 * All Rights Reserved
 *
 * Copyright (c) 2022 Michał Chruścielski
 */

import styles from "../styles/ShortageTableCell.module.scss";
import React from 'react';

const ShortageTableCell: React.FC<{children:any}>=({children, ...props})=> (
    <tr className={styles.main}>
        <td>Woda Cisowianka niegazowana</td>
        <td>42  /  50</td>
        <td>21</td>
        <td className={styles.barTd}>
            <div className={styles.flex}>
                <div>84%</div>
                <div className={styles.bar}>
                    <div className={styles.barRed}
                        style={{width:84}}/>
                </div>
            </div>
        </td>

    </tr>
);


export default ShortageTableCell;
