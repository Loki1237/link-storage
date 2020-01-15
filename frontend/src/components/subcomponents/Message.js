import React from 'react';
import styles from './Message.css';

function Message(props) {
    return (
        <div className={`${styles.Message} ${styles[`${props.data.color}`]}
            ${props.data.closing ? styles.close : ""}`}>
            
            <div className={`${styles.badge} ${styles[`badge-${props.data.color}`]}`}></div>
            <span>{props.data.text}</span>

            <button className={styles["close-button"]}
                onClick={props.closeMessage}>
            </button>
        </div>
    );
}

export default Message;