import React from 'react';
import { connect } from 'react-redux';
import './StyleModals.css';

class ChangeLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ChangeLink: false,
      userID: null,
      name: "",
      URL: "",
      id: null,
      isVisible: true
    }
  }

  componentDidMount() {
    setTimeout( () => this.setState({ ChangeLink: true }), 50 );
    let content = this.props.modal.data;
    this.setState({
      userID: content.userID,
      name: content.name,
      URL: content.URL,
      id: content.id,
      isVisible: content.isVisible
    })
  }

  changeLink() {
    if( this.state.name && this.state.URL ) {
      let link = {
        userID: this.state.userID,
        name: this.state.name,
        URL: this.state.URL,
        id: this.state.id,
        isVisible: this.state.isVisible
      }
  
      fetch('/api/links', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(link)
      }).then(
        result => {
          this.props.updateMyLinks();
          this.setState({ ChangeLink: false });
          setTimeout( this.props.close_modals, 250 );
        },
        error => alert( "Error" )
      )
    }
  }
   
  render() {
    return (
      <div className={`Modal-backdrop  ${this.state.ChangeLink ? "open-Modal-backdrop" : ""}`}>
        <div className={`Modal-window  ${this.state.ChangeLink ? "open-Modal-window" : ""}`}>

          <header className="Modal-header">
            {/* value */ this.props.elementNames.Modals.ChangeLinkHeader}
          </header>

          <input type="text" 
            className="Modal-input"
            placeholder={this.props.elementNames.Modals.placeholderLinkName}
            value={ this.state.name }
            onChange={ (e) => {
              this.setState({ 
                name: e.target.value
              })
            } }
          />

          <input type="text" 
            className="Modal-input"
            placeholder={this.props.elementNames.Modals.placeholderLinkURL}
            value={ this.state.URL }
            onChange={ (e) => {
              this.setState({  
                URL: e.target.value
              })
            } }
          />

          <div className="Modal-bottom-string">
            <label className="Modal-label">
              <input type="checkbox" 
                className="Modal-checkbox"
                checked={this.state.isVisible ? false : true}
                onChange={ (e) => {
                  this.setState({
                    isVisible: e.target.checked ? false : true 
                  })
                } } />
              {/* name */ this.props.elementNames.Modals.labelHiddenBookmark}
            </label>

            <button className="Modal-button Modal-button-cancel"
              onClick={ () => {
                this.setState({ ChangeLink: false });
                setTimeout( this.props.close_modals, 250 );
              } }>
              {/* name */ this.props.elementNames.Modals.buttonCancel}
            </button>

            <button className="Modal-button"
              onClick={ this.changeLink.bind(this) }>
              {/* name */ this.props.elementNames.Modals.buttonSave}
            </button>
          </div>

        </div>
      </div>
    )
  }
  
}
  
//===============================================================

function mapStateToProps( state ) {
  return {
    modal: state.modal,
    user: state.user,
    elementNames: state.elementNames
  }
}

function mapDispatchToProps( dispatch ) {
  return {
      close_modals: function() {
          dispatch({
              type: "CLOSE_MODALS"
          })
      }
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( ChangeLink )