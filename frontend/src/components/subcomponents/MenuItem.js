import React from 'react';
import styles from './MenuItem.css';

export default function MenuItem(props) {
    return (
        <span className={styles["dropdown-item"]}
            onClick={props.onClick}>
            <img src={props.image} alt="" width="10px" height="10px" hspace="6" />
            {props.children}
        </span>
    )
}