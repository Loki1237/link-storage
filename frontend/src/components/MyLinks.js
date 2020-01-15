import React from 'react';
import copy from 'copy-to-clipboard';
import { language } from '../language/index';
import styles from './MyLinks.css';

import Dropdown from './subcomponents/Dropdown';
import MenuItem from './subcomponents/MenuItem';
import Button from './subcomponents/Button';
import Modal from './subcomponents/Modal';
import Bookmark from './subcomponents/Bookmark';

import imgOpen from './images/img_open.png';
import imgOpenNewWindow from './images/img_open_new_window.png';
import imgCopy from './images/img_copy.png';
import imgEdit from './images/img_edit.png';
import imgDelete from './images/img_delete.png';

const ButtonStyle = {
    width: "25%",
    height: "30px",
    fontSize: "14px"
};

class MyLinks extends React.Component {
    constructor(props) {
        super(props);
        this.createList = this.createList.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.state = {
            storage: [],
            isLinks: undefined,
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
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.createList();
        }, 500);
    }

    createList() {
        fetch(`/api/links/${this.props.appData.user.id}`)
            .then(res => res.json())
            .then(links => {
                this.setState({ storage: links });
                this.setState({ isLinks: this.state.storage.length >= 1 });
            })
            .catch(() => {
                this.setState({ isLinks: false });
            });
    }

    copyToClipboard(text) {
        copy(text);
        this.props.showMessage({ 
            text: `${language.Message.copyToClipboard}: ${text}`,
            color: "info" 
        });
    }

    deleteLink(id) {
        fetch(`/api/links/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(() => {
            this.createList();
        }).catch(error => {
            this.props.showMessage({ 
                text: error,
                color: "primary" 
            });
        });
    }

    closeDropdown() {
        this.setState({ 
            dropdown: { 
                id: "", 
                style: {
                    left: 0,
                    top: 0
                }
            } 
        });
    }
    
    render() {
        return (
            <div className={styles.MyLinks}>

                <div className={styles["buttons-container"]}>

                    {/* кнопка - показать скрытые закладки */}
                    <Button color="primary" style={ButtonStyle}
                        onClick={this.props.openModalShowHiddenLinks}>
                        {/* name */ language.MyLinks.secret}
                    </Button>
                    
                    {/* текстовое поле поиска */}
                    <div className={styles.search}>
                        <input type="text"
                            className={styles["search-input"]}
                            placeholder={language.MyLinks.search}
                            value={this.state.search}
                            onChange={(e) => {
                                this.setState({ search: e.target.value });
                            }} />
                        <div className={styles["search-badge"]}></div>
                    </div>
                    
                    {/* кнопка - новая закладка */}
                    <Button color="primary" style={ButtonStyle}
                        onClick={this.props.openModalAddLink}>
                        {/* name */ language.MyLinks.newBookmark}
                    </Button>
                </div>
                  
                {/* контейнер закладок */}
                <div className={styles["bookmarks-container"]}>
                    
                    {this.state.isLinks && this.state.storage.map(item => (
                        <Bookmark key={item.id}
                            data={item} 
                            search={this.state.search}
                            openDropdown={(e) => {
                                const coords = e.target.getBoundingClientRect();
                                this.setState({ 
                                    dropdown: {
                                        isVisible: true, 
                                        link: item,
                                        style: {
                                            left: coords.x + coords.width - 140/*ширина меню*/,
                                            top: coords.y + 26/*высота кнопки*/
                                        }
                                    } 
                                });
                            }} 
                        />
                    ))}

                    {this.state.isLinks === undefined && <div className={styles.loading}></div>}

                    {this.state.isLinks === false && <span className={styles.notLinks}>
                        {/* value */ language.MyLinks.messageNotBookmarks}
                    </span>}

                </div>
                
                {/* dropdown menu */}
                {this.state.dropdown.isVisible && <Dropdown style={this.state.dropdown.style}
                    close={this.closeDropdown}>
                    <MenuItem image={imgOpen}
                        onClick={() => {
                            window.open(this.state.dropdown.link.URL);
                        }}>
                        {/* name */ language.MyLinks.dropdown.open}
                    </MenuItem>

                    <MenuItem image={imgOpenNewWindow}
                        onClick={() => {
                            window.open(
                                this.state.dropdown.link.URL, 
                                "new window", 
                                "left=0,top=0,width=600,height=400"
                            );
                        }}>
                        {/* name */ language.MyLinks.dropdown.inNewWindow}
                    </MenuItem>

                    <MenuItem image={imgCopy}
                        onClick={() => {
                            this.copyToClipboard(this.state.dropdown.link.URL);
                        }}>
                        {/* name */ language.MyLinks.dropdown.copy}
                    </MenuItem>

                    <MenuItem image={imgEdit}
                        onClick={() => {
                            this.setState({ linkData: this.state.dropdown.link });
                            this.props.openModalChangeLink();
                        }}>
                        {/* name */ language.MyLinks.dropdown.edit}
                    </MenuItem>

                    <MenuItem image={imgDelete}
                        onClick={() => {
                            this.deleteLink(this.state.dropdown.link.id);
                        }}>
                        {/* name */ language.MyLinks.dropdown.remove}
                    </MenuItem>
                </Dropdown>}

                {this.props.modal.AddLink && <Modal 
                    showMessage={this.props.showMessage}
                    updateList={this.createList}
                    header={language.Modals.AddLinkHeader}
                    inputFields={[
                        { name: language.Modals.placeholderLinkName },
                        { name: "URL" }
                    ]}
                    checkbox
                    actionButton={language.Modals.buttonAdd}
                    action={"addLink"}
                />}

                {this.props.modal.ChangeLink && <Modal 
                    showMessage={this.props.showMessage}
                    updateList={this.createList}
                    linkData={this.state.linkData}
                    header={language.Modals.ChangeLinkHeader}
                    inputFields={[
                        { name: language.Modals.placeholderLinkName },
                        { name: "URL" }
                    ]}
                    checkbox
                    actionButton={language.Modals.buttonSave}
                    action={"changeLink"}
                />}

                {this.props.modal.ShowHiddenLinks && <Modal
                    showMessage={this.props.showMessage}
                    updateList={this.createList}
                    header={this.props.appData.user.show === "visible" ? language.Modals.ShowSecretLinksHeader : 
                            this.props.appData.user.show === "all" ? language.Modals.HideSecretLinksHeader : ""}
                    text={language.Modals.ShowHiddenText}
                    inputFields={[{ 
                        type: "password",
                        maxLength: 4
                    }]}
                    actionButton="OK"
                    action={"showHiddenLinks"}
                />}

                {this.props.modal.DeleteUser && <Modal
                    showMessage={this.props.showMessage}
                    exit={this.props.exit}
                    header={language.Modals.DeleteUserHeader}
                    text={language.Modals.DeleteUserText}
                    inputFields={[]}
                    actionButton={language.Modals.buttonRemove}
                    action={"deleteUser"}
                />}

                {this.props.modal.ChangePassword && <Modal
                    showMessage={this.props.showMessage}
                    header={language.Modals.ChangePasswordHeader}
                    inputFields={[{ 
                        name: language.Modals.placeholderPassword,
                        type: "password",
                        maxLength: 20
                    }, { 
                        name: language.Modals.placeholderNewPassword,
                        type: "password",
                        maxLength: 20 
                    }]}
                    actionButton={language.Modals.buttonSave}
                    action={"changePassword"}
                />}

                {this.props.modal.ChangePIN && <Modal 
                    showMessage={this.props.showMessage}
                    header={language.Modals.ChangePINcodeHeader}
                    inputFields={[{ 
                        name: language.Modals.placeholderPassword,
                        type: "password",
                        maxLength: 20
                    }, { 
                        name: language.Modals.placeholderNewPINcode,
                        type: "password",
                        maxLength: 4
                    }]}
                    actionButton={language.Modals.buttonSave}
                    action={"changePIN"}
                />}
              
            </div>
        );
    }
}
  
export default MyLinks;  
