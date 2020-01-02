import React from 'react';
import copy from 'copy-to-clipboard';
import styles from './MyLinks.css';

import Dropdown from './subcomponents/Dropdown';
import MenuItem from './subcomponents/MenuItem';
import Button from './subcomponents/Button';
import Modal from './subcomponents/Modal';

import img_open from './images/img_open.png';
import img_open_new_window from './images/img_open_new_window.png';
import img_copy from'./images/img_copy.png';
import img_edit from'./images/img_edit.png';
import img_delete from './images/img_delete.png';
import img_cancel from './images/img_cancel.png';

const ButtonStyle = {
    width: "25%",
    height: "30px",
    fontSize: "14px"
}

class MyLinks extends React.Component {
    constructor(props) {
        super(props);
        this.createList = this.createList.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.state = {
            storage: [],
            isLinks: undefined,
            showHiddenLinks: false,
            dropdown: {
                isVisible: false,
                link: {},
                style: {
                    left: 0,
                    top: 0
                }
            },
            search: "",
            linkData: {}
        }
    }

    componentDidMount() {
        setTimeout( () => {
            this.createList();
        }, 500 )
    }

    createList() {
        this.setState({ showHiddenLinks: localStorage.getItem("showHidden") ? true : false })
        fetch(`/api/links/${this.props.user.id}`)
            .then(res => res.json())
            .then(links => {
                let allLinks = links;
                let visibleLinks = allLinks.filter( link => link.isVisible );
                this.setState({ storage: this.state.showHiddenLinks ? allLinks : visibleLinks })
                this.setState({ isLinks: this.state.storage.length ? true : false })
            })
            .catch(err => {
                this.setState({ isLinks: false })
            })
    }

    copyToClipboard( text ) {
        copy( text );
        this.props.showMessage({ 
            text: `${this.props.elementNames.Message.copyToClipboard}: ${text}`,
            color: "primary" 
        });
    }

    deleteLink( id, userID ) {
        fetch('/api/links', {
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

    closeDropdown() {
        this.setState({ dropdown: { 
            id: "", 
            style: {
                left: 0,
                top: 0
            }
        } })
    }
    
    render() {
        return (
            <div className={styles.MyLinks}>

                <div className={styles["ML-buttons-container"]}>

                    {/* кнопка - показать скрытые закладки */}
                    <Button color="primary" style={ButtonStyle}
                        onClick={ () => {
                            if( !this.state.showHiddenLinks ) {
                                this.props.openModalShowHiddenLinks();
                            } else {
                                localStorage.removeItem("showHidden");
                                this.createList();
                            }
                        } }>
                        {/* name */ !this.state.showHiddenLinks ? 
                            this.props.elementNames.MyLinks.showHidden : 
                            this.props.elementNames.MyLinks.hideHidden}
                    </Button>
                    
                    {/* текстовое поле поиска */}
                    <div className={styles["ML-search"]}>
                        <input type="text"
                            className={styles["ML-search-input"]}
                            placeholder={this.props.elementNames.MyLinks.search}
                            value={this.state.search}
                            onChange={ (e) => {
                                this.setState({ search: e.target.value });
                            }} />
                        <div className={styles["ML-search-badge"]}></div>
                    </div>
                    
                    {/* кнопка - новая закладка */}
                    <Button color="primary" style={ButtonStyle}
                        onClick={() => {
                            this.props.openModalAddLink();
                        }}>
                        {/* name */ this.props.elementNames.MyLinks.newBookmark}
                    </Button>
                </div>
                  
                {/* контейнер закладок */}
                <div className={styles["ML-container"]}>
                    
                    {/* тело закладки */}
                    {this.state.isLinks && this.state.storage.map( item => (
                        <div key={item.id}
                            className={`${styles.link }
                                ${!item.isVisible ? styles.hiddenLink : ""} 
                                ${item.name.toLowerCase().indexOf( this.state.search.toLowerCase() ) === 0 &&
                                    this.state.search ? styles["link-searched"] : ""}`}>
                            
                            {/* значок скрытой закладки */}
                            {!item.isVisible && <div className={styles["hiddenLink-badge"]}
                                title="Скрытая закладка">
                                    <div className={styles["hiddenLink-badge-eye"]}></div>
                            </div>}

                            <img className={styles["link-icon" ]}
                                alt="*"
                                src={'https://plus.google.com/_/favicon?domain_url=' + item.URL} />
                            
                            <span className={styles["link-name"]} onClick={ () => window.open( item.URL ) }> 
                                {item.name}
                            </span>

                            <span className={styles["link-URL"]} onClick={ () => window.open( item.URL ) }> 
                                {item.URL}
                            </span>
                          
                            {/* button of call dropdown */}
                            <button className={styles["link-button-dropdown"]}
                                onClick={ (e) => {
                                    let coords = e.target.getBoundingClientRect();
                                    this.setState({ dropdown: {
                                        isVisible: true, 
                                        link: item,
                                        style: {
                                            left: coords.x + coords.width - 170,
                                            top: coords.y + 26
                                        }
                                    } })
                                }}>
                            </button>

                        </div>
                    ) )}

                    {this.state.isLinks === undefined && <div className={styles.loading}></div>}

                    {this.state.isLinks === false && <span className={styles.notLinks}>
                        {/* value */ this.props.elementNames.MyLinks.messageNotBookmarks}
                    </span>}

                </div>
                
                {/* dropdown menu */}
                {this.state.dropdown.isVisible && <Dropdown style={this.state.dropdown.style}
                    close={this.closeDropdown}>
                    <MenuItem image={img_open}
                        onClick={() => window.open( this.state.dropdown.link.URL )}>
                        {/* name */ this.props.elementNames.MyLinks.dropdown.open}
                    </MenuItem>

                    <MenuItem image={img_open_new_window}
                        onClick={() => {
                            window.open( this.state.dropdown.link.URL, "new window", "left=0,top=0,width=600,height=400" )
                        }}>
                        {/* name */ this.props.elementNames.MyLinks.dropdown.openInNewWindow}
                    </MenuItem>

                    <MenuItem image={img_copy}
                        onClick={() => this.copyToClipboard( this.state.dropdown.link.URL )}>
                        {/* name */ this.props.elementNames.MyLinks.dropdown.copy}
                    </MenuItem>

                    <MenuItem image={img_edit}
                        onClick={() => {
                            this.setState({ linkData: this.state.dropdown.link });
                            this.props.openModalChangeLink();
                        }}>
                        {/* name */ this.props.elementNames.MyLinks.dropdown.edit}
                    </MenuItem>

                    <MenuItem image={img_delete}
                        onClick={() => this.deleteLink( this.state.dropdown.link.id, this.props.user.id ) }>
                        {/* name */ this.props.elementNames.MyLinks.dropdown.remove}
                    </MenuItem>

                    <MenuItem image={img_cancel}
                        onClick={this.closeDropdown}>
                        {/* name */ this.props.elementNames.MyLinks.dropdown.cancel}
                    </MenuItem>
                </Dropdown>}

                {this.props.modal.AddLink && <Modal 
                    updateList={this.createList}
                    header={this.props.elementNames.Modals.AddLinkHeader}
                    firstInput={{ placeholder: this.props.elementNames.Modals.placeholderLinkName }}
                    secondInput={{ placeholder: this.props.elementNames.Modals.placeholderLinkURL }}
                    checkbox
                    primaryButton={this.props.elementNames.Modals.buttonAdd}
                    action={"addLink"}
                />}

                {this.props.modal.ChangeLink && <Modal 
                    updateList={this.createList}
                    linkData={this.state.linkData}
                    header={this.props.elementNames.Modals.ChangeLinkHeader}
                    firstInput={{ placeholder: this.props.elementNames.Modals.placeholderLinkName }}
                    secondInput={{ placeholder: this.props.elementNames.Modals.placeholderLinkURL }}
                    checkbox
                    primaryButton={this.props.elementNames.Modals.buttonSave}
                    action={"changeLink"}
                />}

                {this.props.modal.ShowHiddenLinks && <Modal 
                    updateList={this.createList}
                    text={this.props.elementNames.Modals.ShowHiddenText}
                    firstInput
                    primaryButton={this.props.elementNames.Modals.buttonOk}
                    action={"showHiddens"}
                />}
              
            </div>
        )
    }
  
}
  
export default MyLinks;  