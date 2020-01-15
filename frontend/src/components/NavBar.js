import React from 'react';
import styles from './NavBar.css';

class NavBar extends React.Component {
    render() {
        return (
            <nav className={styles.NavBar}>

                <div className={styles.label}>
                    Links Storage
                </div>

                {this.props.appData.user.id && <button className={styles.item}
                    onClick={ this.props.openUserMenu }>
                    {this.props.appData.user.name}
                </button>}

            </nav>
        );
    }
}
  
export default NavBar;
