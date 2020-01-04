import React from 'react';
import styles from './Dropdown.css';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.closeMenu = this.closeMenu.bind(this);
        this.state = {
            Dropdown: false
        }
    }

    componentDidMount() {
        setTimeout( () => this.setState({ Dropdown: true }), 0 );
    }

    closeMenu() {
        this.setState({ Dropdown: false });
        setTimeout( this.props.close, 100 );
    }

    render() {
        return (
            <div className={styles.backdrop}
                onClick={this.closeMenu}>
                
                <div className={`${styles.Dropdown} ${this.state.Dropdown ? styles["open-dropdown"] : ""}`}
                    style={this.props.style}>
                    {this.props.children}
                </div>

            </div>
        )
    }
    
}

export default Dropdown;