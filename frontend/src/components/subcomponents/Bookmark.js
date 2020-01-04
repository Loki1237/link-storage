import React from 'react';
import styles from './Bookmark.css';

function Bookmark(props) {
    return(
        <div className={`${styles.Bookmark }
            ${!props.data.isVisible ? styles.hidden : ""} 
            ${props.data.name.toLowerCase().indexOf( props.search.toLowerCase() ) === 0 && props.search 
                ? styles.searched : ""}`}>

            {!props.data.isVisible && <div className={styles["hidden-badge"]}
                title="Скрытая закладка">
                <div className={styles["hidden-badge-eye"]}></div>
            </div>}

            <div className={styles.data}
                onClick={() => window.open(props.data.URL)}>
                <img className={styles.icon}
                    alt="*"
                    src={'https://plus.google.com/_/favicon?domain_url=' + props.data.URL} />
                
                <span className={styles.name}> 
                    {props.data.name}
                </span>

                <span className={styles.URL}> 
                    {props.data.URL}
                </span>
            </div>

            <button className={styles["button-dropdown"]}
                onClick={props.openDropdown}>
            </button>
        </div>
    );
}

export default Bookmark;