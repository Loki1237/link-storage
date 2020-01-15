import React from 'react';
import styles from './Button.css';

function Button(props) {
    return (
        <div className={`${styles.Button} ${styles[`${props.color}`]}`}
            style={props.style}
            onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default Button;
