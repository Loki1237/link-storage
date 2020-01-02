import React from 'react';
import styles from './NavBar.css';

class NavBar extends React.Component {
    
    render() {
        return (
            <nav className={styles.NavBar}>

                <div className={styles["NavBar-label"]}>
                    Links Storage
                </div>

                {this.props.user.id && <button className={styles["NavBar-item"]}
                    onClick={ this.props.openUserMenu }>
                    {this.props.user.name}
                </button>}

            </nav>
        )
    }
  
}
  
export default NavBar;
