import React from 'react';
import './UserMenu.css';

import img_user_settings from './Images/img_user_settings.png';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserMenu: false,
      changeLang: false
    }
  }

  componentDidMount() {
    setTimeout( () => this.setState({ UserMenu: true }), 0 )
  }
    
  render() {
    return (
      <div className={ `UserMenu-backdrop ${this.state.UserMenu ? "open-UserMenu-backdrop" : ""}` }
        id="backdrop"
        onClick={ (e) => {
          if( e.target.id === "backdrop" ) {
            this.setState({ UserMenu: false });
            setTimeout( this.props.close_user_menu, 200 );
          }
        } }>

        <div name="Меню пользователя"
          className={ `UserMenu ${this.state.UserMenu ? "open-UserMenu" : ""}` }>

          <span className="UserMenu-item UserMenu-item-disabled">
            <img className="UserMenu-item-icon" 
              alt="*"
              src={img_user_settings} />
            {/* name */ this.props.elementNames.UserMenu.header}
          </span>

          <hr color="#AAA" width="90%" size="1" align="center" />

          <span className="UserMenu-item"
            onClick={ () => {
              this.props.open_modal({ window: "ChangePassword" })
            } }>
            {/* name */ this.props.elementNames.UserMenu.changePass}
          </span>

          <span className="UserMenu-item"
            onClick={ () => {
              this.props.open_modal({ window: "ChangePINcode" })
            } }>
            {/* name */ this.props.elementNames.UserMenu.changePIN}
          </span>

          <span className="UserMenu-item"
            onClick={ () => {
              this.props.open_modal({ window: "DeleteUser" })
            } }>
            {/* name */ this.props.elementNames.UserMenu.delProfile}
          </span>

          <hr color="#AAA" width="90%" size="1" align="center" />

          <span className="UserMenu-item">
            {/* name */ this.props.elementNames.UserMenu.lang.itemName}
            <div className="UserMenu-lang">
              <span className="UserMenu-item"
                onClick={ () => {
                  this.props.set_language({ lang: "rus" })
                  document.cookie = "lang=rus; max-age=31536000";
                } }>
                {/* name */ this.props.elementNames.UserMenu.lang.rus}
              </span>
              <span className="UserMenu-item"
                onClick={ () => {
                  this.props.set_language({ lang: "eng" })
                  document.cookie = "lang=eng; max-age=31536000";
                } }>
                {/* name */ this.props.elementNames.UserMenu.lang.eng}
              </span>
            </div>
          </span>

          <hr color="#AAA" width="90%" size="1" align="center" />

          <span name="Выйти"
            className="UserMenu-item"
            onClick={() => {
              this.setState({ UserMenu: false });
              setTimeout( this.props.exit, 200 )
              setTimeout( this.props.close_user_menu, 200 );
            }}>
            {/* name */ this.props.elementNames.UserMenu.exit}
          </span>
          
        </div>
      </div>
    )
  }
  
}
  
export default UserMenu;
  