import React from 'react';
import './NavBar.css';

class NavBar extends React.Component {
    
  render() {
    return (
      <nav className="NavBar">

        <div className="NavBar-label">Links Storage</div>

        {this.props.user.id && <button className="NavBar-item"
          onClick={ this.props.open_user_menu }>
            {this.props.user.name}
        </button>}

      </nav>
    )
  }
  
}
  
export default NavBar;
