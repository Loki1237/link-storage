import React from 'react';
import { connect } from 'react-redux';
import { setLanguage } from '../../actions/index';
import styles from './LanguageSwitch.css';

function LanguageSwitch(props) {
    return (
        <div className={styles.LanguageSwitch}>
            <span className={styles["lang-item"]}
                onClick={ () => {
                    props.setLanguage({ lang: "eng" });
                    localStorage.setItem("lang", "eng");
                } }>
                English
            </span>

            <span className={styles["lang-item"]}
                onClick={ () => {
                    props.setLanguage({ lang: "rus" });
                    localStorage.setItem("lang", "rus");
                } }>
                Русский
            </span>
        </div>
    )
}

//===============================================================

function mapStateToProps( state ) {
    return {
        elementNames: state.elementNames
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setLanguage: ownProps => dispatch( setLanguage( ownProps ) ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( LanguageSwitch );