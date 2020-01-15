import React from 'react';
import { connect } from 'react-redux';
import { SetAppData } from '../../actions/index';
import { translate } from '../../language/index';
import styles from './LanguageSwitch.css';

function LanguageSwitch(props) {
    return (
        <div className={styles.LanguageSwitch}>
            <button className={styles["lang-item"]}
                onClick={ () => {
                    translate("eng");
                    props.setLang("eng");
                } }>
                English
            </button>

            <button className={styles["lang-item"]}
                onClick={ () => {
                    translate("rus");
                    props.setLang("rus");
                } }>
                Русский
            </button>
        </div>
    );
}

//===============================================================

function mapStateToProps(state) {
    return {
        appData: state.appData
    };
}
  
function mapDispatchToProps(dispatch) {
    return {
        setAppData: (ownProps) => dispatch(SetAppData(ownProps))
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitch);
