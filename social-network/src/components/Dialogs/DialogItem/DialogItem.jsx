import React from 'react';
import styles from './DialogItem.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={styles.dialog + ' ' + styles.active}>
            <div className={styles.photoContainer}>
                <img className={styles.userPhotoMessage}
                     src={props.photo}/>
            </div>
            <div>
                <NavLink to={path} className={styles.names}>
                    {props.name}
                </NavLink>
            </div>
        </div>
    );
}

export default DialogItem;