import styles from "../styles/MediumWidget.module.scss";
import React, {FC} from 'react';

const MediumWidget: React.FC<{children:any, number:any}>=({children, number, ...props})=> (
      <div className={styles.main}>
        <div className={styles.number}>
          {number}
        </div>
        <div className={styles.text}>
          {children}
        </div>
      </div>
  );


export default MediumWidget;
