import React from 'react';
import { language } from '../../language/index';
import styles from './InputField.css';

class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "text"
        };
    }

    componentDidMount() {
        this.setState({ type: this.props.type });
    }

    render() {
        return (
            <div className={styles.InputField}
                style={this.props.style}>
                    
                <input type={this.state.type} 
                    autoComplete="off"
                    autoFocus={this.props.autoFocus}
                    maxLength={this.props.maxLength}
                    className={`${styles.input}
                        ${this.props.highlighting ? styles.highlighting : ""}`}
                    value={this.props.value}
                    onChange={this.props.onChange} />

                <span className={`${styles["field-name"]}
                    ${this.props.value ? styles.completed : ""}`}>
                    {this.props.name}
                </span>

                {this.props.type === "password" && <div className={styles.eye}
                    title={language.EntryBar.titlePassword}
                    onClick={() => {
                        this.setState({ type: this.state.type === "text" ? "password" : "text" });
                    }}>
                    {this.state.type === "password" && <div className={styles["eye-slash"]}></div>}
                </div>}

                {this.props.tip && <div className={styles.tip}
                    title={this.props.tip}>
                    ?
                </div>}
            </div>
        );
    }
}

export default InputField;
