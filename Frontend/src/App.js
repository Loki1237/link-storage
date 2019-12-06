import React from 'react';
import './index.css';

import { connect } from 'react-redux';
import { set_language, open_my_links, open_aut_bar, authorization } from './actions/index';

import NavBar from './containers/NavBar';
import EntryBarAut from './containers/EntryBarAut';
import EntryBarReg from './containers/EntryBarReg';
import MyLinks from './containers/MyLinks';
import UserMenu from './containers/UserMenu';

import AddLink from './Components/modals/AddLink';
import ChangeLink from './Components/modals/ChangeLink';
import ShowHiddens from './Components/modals/ShowHiddens';
import DeleteUser from './Components/modals/DeleteUser';
import ChangePassword from './Components/modals/ChangePassword';
import ChangePINcode from './Components/modals/ChangePINcode';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHiddenLinks: false
    }
  }

  componentDidMount() {
    let arr = document.cookie.split("; ");
    let cookie = {};

    for(let i = 0; i < arr.length; i++) {
      let item = arr[i].split("=");
      cookie[item[0]] = item[1];
    }

    if( cookie.isAuthorized === "true" ) {
      fetch("/api/users")
        .then( res => res.json() )
        .then( 
          users => {
            for(let i = 0; i < users.length; i++) {
              if( cookie.login === users[i].login && cookie.password === users[i].password ) {
                this.props.authorization({ data: users[i] });
                this.props.open_my_links();
                break;
              } else {
                this.props.open_aut_bar()
              }
            }
            if( !this.props.user.id ) {
              this.props.open_aut_bar()
            }
          },
          error => {
            this.props.open_aut_bar()
          }
        )
    } else {
      this.props.open_aut_bar()
    }

    this.setState({ showHiddenLinks: cookie.showHiddenLinks === "true" ? true : false })
    if(cookie.lang === "eng") this.props.set_language({ lang: "eng" })
    if(cookie.lang === "rus") this.props.set_language({ lang: "rus" })
  }

  updateMyLinks() {
    this.props.close_all_components()
    setTimeout( () => {
      this.props.open_my_links()
    }, 50 )
  }

  updateUserProps() {
    fetch('/api/users')
      .then( res => res.json() )
      .then( users => {
        for( let i = 0; i < users.length; i++) {
          if( users[i].id === this.props.user.id ) {
            this.props.authorization({ data: users[i] });
            document.cookie = "isAuthorized=true; max-age=31536000";
            document.cookie = `login=${this.props.user.login}; max-age=31536000`;
            document.cookie = `password=${this.props.user.password}; max-age=31536000`;
            document.cookie = `lang=${this.props.elementNames.language}; max-age=31536000`;
            break;
          }
        }
      })
  }

  showHL() {
    document.cookie = "showHiddenLinks=true; max-age=31536000";
    this.setState({ showHiddenLinks: true })
    setTimeout( this.updateMyLinks(), 500 )
  }

  hideHL() {
    document.cookie = "showHiddenLinks=false; max-age=0";
    this.setState({ showHiddenLinks: false })
    setTimeout( this.updateMyLinks(), 500 )
  }

  exit() {
    this.props.exit()
    this.setState({ showHiddenLinks: false })
    setTimeout( () => {
      this.props.open_aut_bar()
    }, 100 )
    document.cookie = "isAuthorized=false; max-age=0";
    document.cookie = "login=null; max-age=0";
    document.cookie = "password=null; max-age=0";
    document.cookie = "showHiddenLinks=false; max-age=0";
  }

  render() {
    return (
      <div className="body-app">

        <NavBar 
          exit={this.exit.bind(this)}
        />

        {this.props.components.AutBar && <EntryBarAut 
        />}

        {this.props.components.RegBar && <EntryBarReg 
        />}
  
        {this.props.components.MyLinks && <MyLinks 
          showHiddenLinks={this.state.showHiddenLinks}
          hideHL={this.hideHL.bind(this)}
        />}

        {this.props.components.UserMenu && <UserMenu 
          updateMyLinks={this.updateMyLinks.bind(this)}
          updateUserProps={this.updateUserProps.bind(this)}
          showHiddenLinks={this.state.showHiddenLinks}
          showHL={this.showHL.bind(this)}
          hideHL={this.hideHL.bind(this)}
          exit={this.exit.bind(this)}
        />}

        {this.props.modal.window === "AddLink" && <AddLink 
          updateMyLinks={this.updateMyLinks.bind(this)}
        />}

        {this.props.modal.window === "ChangeLink" && <ChangeLink 
          updateMyLinks={this.updateMyLinks.bind(this)}
        />}

        {this.props.modal.window === "ShowHiddens" && <ShowHiddens 
          showHL={this.showHL.bind(this)}
        />}

        {this.props.modal.window === "DeleteUser" && <DeleteUser 
          exit={this.exit.bind(this)}
        />}

        {this.props.modal.window ==="ChangePassword" && <ChangePassword
          updateUserProps={this.updateUserProps.bind(this)}
        />}

        {this.props.modal.window === "ChangePINcode" && <ChangePINcode
          updateUserProps={this.updateUserProps.bind(this)}
        />}

        {(this.props.components.AutBar || this.props.components.RegBar) && <div className="select-language">
          <span className="lang-item"
            onClick={ () => {
              this.props.set_language({ lang: "eng" })
              document.cookie = "lang=eng; max-age=31536000";
            } }>English</span>

          <span className="lang-item"
            onClick={ () => {
              this.props.set_language({ lang: "rus" })
              document.cookie = "lang=rus; max-age=31536000";
            } }>Русский</span>
        </div>}

      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    components: state.components,
    modal: state.modal,
    user: state.user,
    elementNames: state.elementNames
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    open_my_links: () => dispatch( open_my_links ),
    open_aut_bar: () => dispatch( open_aut_bar ),
    authorization: ownProps => dispatch( authorization( ownProps ) ),
    close_all_components: function() {
      dispatch({
        type: "CLOSE_ALL_COMPONENTS"
      })
    },
    set_language: ownProps => dispatch( set_language( ownProps ) ),
    exit: function() {
      dispatch({
        type: "EXIT"
      })
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( App );