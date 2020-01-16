import React from 'react';
import styles from './Message.css';
import info from '../images/message_info.png';
import success from '../images/message_success.png';
import warning from '../images/message_warning.png';
import danger from '../images/message_danger.png';

const icons = { info, success, warning, danger };

function Message(props) {
    return (
        <div className={`${styles.Message} ${styles[`${props.data.color}`]}
            ${props.data.closing ? styles.close : ""}`}>

            <div className={styles.header}>
                <div className={styles.badge}>
                    <img src={icons[`${props.data.color}`]} width="14" height="14" />
                </div>

                <span>{props.data.color}</span>

                <button className={styles["close-button"]}
                    onClick={props.closeMessage}>
                </button>
            </div>

            <div className={styles.content}>
                <span>{props.data.text}</span>
            </div>
        </div>
    );
}

export default Message;