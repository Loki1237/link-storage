import React from 'react';
import copy from 'copy-to-clipboard';
import './MyLinks.css';

import img_open from './Images/img_open.png';
import img_open_new_window from './Images/img_open_new_window.png';
import img_copy from'./Images/img_copy.png';
import img_edit from'./Images/img_edit.png';
import img_delete from './Images/img_delete.png';
import img_cancel from './Images/img_cancel.png';

class MyLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storage: [],
      isLinks: undefined,
      messageOfCopy: {
        isVisible: false,
        text: ""
      },
      dropdown: {
        id: "",
        style: {
          transformOrigin: "right top",
          top: 0,
        }
      },
      search: ""
    }
  }

  componentDidMount() {
    this.createList();
  }

  createList() {
    fetch("/api/links")
      .then(res => res.json())
      .then(links => {
        let allLinks = links.filter( link => {
          return link.userID === this.props.user.id;
        } );
        let visibleLinks = allLinks.filter( link => link.isVisible );
        this.setState({ storage: this.props.showHiddenLinks ? allLinks : visibleLinks })
        this.setState({ isLinks: this.state.storage.length ? true : false })
      })
      .catch(err => {
        this.setState({ isLinks: false })
      })
  }

  copyToClipboard( text ) {
    copy( text );
    if( !this.state.messageOfCopy.isVisible ) {
      this.setState({ messageOfCopy: { 
        isVisible: true, 
        text: text
      } });
      setTimeout( () => this.setState({ messageOfCopy: { isVisible: false } }), 2000 )
    }
  }

  deleteLink( id, userID ) {
    etch('/api/links', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        userID,
        id
      })
    }).then(
      res => this.createList(),
      err => alert( err )
    )
  }
   
  render() {
    return (
      <div className="MyLinks">

        <div className="ML-buttons-container">

          {/* кнопка - показать скрытые закладки */}
          <button className="ML-button"
            onClick={ () => {
              if( !this.props.showHiddenLinks ) {
                this.props.open_modal({ window: "ShowHiddens" })
              } else {
                this.props.hideHL()
              }
            } }>
            {/* name */ !this.props.showHiddenLinks ? 
              this.props.elementNames.MyLinks.showHidden : 
              this.props.elementNames.MyLinks.hideHidden}
          </button>
          
          {/* текстовое поле поиска */}
          <div className="ML-search">
            <input type="text"
              className="ML-search-input"
              placeholder={this.props.elementNames.MyLinks.search}
              value={this.state.search}
              onChange={ (e) => {
                this.setState({ search: e.target.value })
              }} />
            <div className="ML-search-badge"></div>
          </div>
          
          {/* кнопка - новая закладка */}
          <button className="ML-button"
            onClick={ () => {
              this.props.open_modal({ window: "AddLink" })
            } }>
            {/* name */ this.props.elementNames.MyLinks.newBookmark}
          </button>
        </div>
        
        {/* контейнер закладок */}
        <div className="ML-container">
          
          {/* тело закладки */}
          {this.state.isLinks && this.state.storage.map( item => (
            <div key={item.id}
              className={`link 
                ${!item.isVisible ? "hiddenLink" : ""} 
                ${item.name.toLowerCase().indexOf( this.state.search.toLowerCase() ) === 0 &&
                  this.state.search ? "link-searched" : ""}`}>
                
              {/* значок скрытой закладки */}
              {!item.isVisible && <div className="hiddenLink-badge"
                data-title={"Скрытая закладка"}>
                  <div className="hiddenLink-badge-eye"></div>
              </div>}

              <img className="link-icon" 
                alt="*"
                src={'https://plus.google.com/_/favicon?domain_url=' + item.URL} />
              
              <span className="link-name" onClick={ () => window.open( item.URL ) }> 
                {item.name}
              </span>

              <span className="link-URL" onClick={ () => window.open( item.URL ) }> 
                {item.URL}
              </span>
              
              {/* dropdown menu */}
              <button
                className="link-button-dropdown"
                onClick={ (e) => {
                  this.setState({ dropdown: { id: item.id, style: this.state.dropdown.style } })
                  let docHeight = document.documentElement.clientHeight;
                  if( docHeight - e.clientY >= 160 ) {
                    this.setState({ dropdown: { 
                      id: item.id, 
                      style: {
                        transformOrigin: "right top",
                        top: 2
                      }
                    } })
                  } else {
                    this.setState({ dropdown: { 
                      id: item.id, 
                      style: {
                        transformOrigin: "right bottom",
                        bottom: 2
                      }
                    } })
                  }
                }}>
              </button>
              {this.state.dropdown.id === item.id && <div className="link-dropdown"
                style={this.state.dropdown.style}
                onClick={ () => {
                  this.setState({ dropdown: { 
                    id: null, 
                    style: this.state.dropdown.style 
                  } })
                }}>

                <div className="link-backdrop"
                  onClick={ () => {
                    this.setState({ dropdown: { 
                      id: null, 
                      style: this.state.dropdown.style 
                    } })
                  } }>
                </div>
                
                {/* открыть */}
                <span className="link-dropdown-item"
                  onClick={ () => window.open( item.URL ) }>
                  <img src={img_open} alt="o" width="10px" height="10px" hspace="6" />
                  {/* name */ this.props.elementNames.MyLinks.dropdown.open}
                </span>
                
                {/* открыть в новом окне */}
                <span className="link-dropdown-item"
                  onClick={ () => {
                    window.open( item.URL, "new window", "left=0,top=0,width=600,height=400" ) ;
                  } }>
                  <img src={img_open_new_window} alt="o" width="10px" height="10px" hspace="6" />
                  {/* name */ this.props.elementNames.MyLinks.dropdown.openInNewWindow}
                </span>
                
                {/* копировать */}
                <span className="link-dropdown-item"
                  onClick={ () => this.copyToClipboard( item.URL ) }>
                  <img src={img_copy} alt="o" width="10px" height="10px" hspace="6" />
                  {/* name */ this.props.elementNames.MyLinks.dropdown.copy}
                </span>
                
                {/* редактировать */}
                <span className="link-dropdown-item"
                  onClick={ () => {
                    this.props.open_modal({ window: "ChangeLink", data: {
                      userID: item.userID,
                      name: item.name,
                      URL: item.URL,
                      id: item.id,
                      isVisible: item.isVisible
                    } });
                  } }>
                  <img src={img_edit} alt="o" width="10px" height="10px" hspace="6" />
                  {/* name */ this.props.elementNames.MyLinks.dropdown.edit}
                </span>
                
                {/* удалить */}
                <span className="link-dropdown-item"
                  onClick={ () => this.deleteLink( item.id, this.props.user.id ) }>
                  <img src={img_delete} alt="o" width="10px" height="10px" hspace="6" />
                  {/* name */ this.props.elementNames.MyLinks.dropdown.remove}
                </span>

                <span className="link-dropdown-slash"></span>
                
                {/* назад */}
                <span className="link-dropdown-item"
                  onClick={ () => {
                    this.setState({ dropdown: { 
                      id: null, 
                      style: this.state.dropdown.style 
                    } }) 
                  } }>
                  <img src={img_cancel} alt="o" width="10px" height="10px" hspace="6" />
                  {/* name */ this.props.elementNames.MyLinks.dropdown.cancel}
                </span>

              </div>}

            </div>
          ) )}

          {this.state.isLinks === undefined && <div className="loading"></div>}

          {this.state.isLinks === false && <span className="notLinks">
            {/* value */ this.props.elementNames.MyLinks.messageNotBookmarks}
          </span>}

          {this.state.messageOfCopy.isVisible && <div className="message-of-copy-to-clipboard">
            {/* value */ this.props.elementNames.MyLinks.messageCopyToClipboard + ": " + this.state.messageOfCopy.text}
          </div>}

        </div>
        
      </div>  
    )
  }
  
}
  
export default MyLinks;  