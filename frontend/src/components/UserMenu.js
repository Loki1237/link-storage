import React from 'react';
import styles from './UserMenu.css';
import { language, translate } from '../language/index';

import imgUserSettings from './images/img_user_settings.png';

class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserMenu: false,
            changeLang: false
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ UserMenu: true }), 0);
    }

    closeMenu = () => {
        this.setState({ UserMenu: false });
        setTimeout(this.props.closeUserMenu, 200);
    }
    
    render() {
        return (
            <div className={`${styles.backdrop} 
                ${this.state.UserMenu ? styles["open-backdrop"] : ""}`}
                id="backdrop"
                onClick={(e) => {
                    if (e.target.id === "backdrop") {
                        this.closeMenu();
                    }
                }
            }>

                <div className={ `${styles.UserMenu} ${this.state.UserMenu ? styles["open-UserMenu"] : ""}` }>
                    {/*========== З А Г О Л О В О К ===========*/}
                    <span className={`${styles["menu-item"]} ${styles.disabled}`}>
                        <img className={styles["menu-item-icon"]}
                            alt="*"
                            src={imgUserSettings} />
                        {/* name */ language.UserMenu.header}
                    </span>

                    <hr color="#AAA" width="90%" size="1" align="center" />

                    {/*========== ИЗМЕНИТЬ ПАРОЛЬ ===========*/}
                    <span className={styles["menu-item"]}
                        onClick={() => {
                            this.closeMenu();
                            this.props.openModalChangePassword();
                        }}>
                        {/* name */ language.UserMenu.changePass}
                    </span>

                    {/*========== ИЗМЕНИТЬ ПИН-КОД ===========*/}
                    <span className={styles["menu-item"]}
                        onClick={() => {
                            this.closeMenu();
                            this.props.openModalChangePINcode();
                        }}>
                        {/* name */ language.UserMenu.changePIN}
                    </span>
                    
                    {/*========== УДАЛИТЬ ПРОФИЛЬ ===========*/}
                    <span className={styles["menu-item"]}
                        onClick={() => {
                            this.closeMenu();
                            this.props.openModalDeleteUser();
                        }}>
                        {/* name */ language.UserMenu.delProfile}
                    </span>

                    <hr color="#AAA" width="90%" size="1" align="center" />
                    
                    {/*========== Я З Ы К ===========*/}
                    <button className={styles["menu-item"]}
                        style={{ 
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            border: "none"
                        }}
                        onClick={() => {
                            this.setState({ changeLang: !this.state.changeLang });
                        }}
                        onBlur={() => {
                            this.setState({ changeLang: false });
                        }}>

                        <div className={styles["arrow-icon"]}></div>
                        {/* name */ language.UserMenu.language}

                        {this.state.changeLang && <div className={styles["language-switch"]}>
                            <span className={styles["menu-item"]}
                                onClick={() => {
                                    translate("rus");
                                    this.props.setAppData({ lang: "rus" });
                                }}>
                                Русский
                            </span>
                            <span className={styles["menu-item"]}
                                onClick={() => {
                                    translate("eng");
                                    this.props.setAppData({ lang: "eng" });
                                }}>
                                English
                            </span>
                        </div>}
                    </button>

                    <hr color="#AAA" width="90%" size="1" align="center" />
                    
                    {/*========== В Ы Й Т И ===========*/}
                    <span className={styles["menu-item"]}
                        onClick={() => {
                            this.setState({ UserMenu: false });
                            setTimeout(() => {
                                this.props.exit();
                                this.closeMenu();
                            }, 200);
                        }}>
                        {/* name */ language.UserMenu.exit}
                    </span>
                  
                </div>
            </div>
        );
    }
}
  
export default UserMenu;
