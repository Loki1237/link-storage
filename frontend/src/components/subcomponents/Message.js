import React from 'react';
import { connect } from 'react-redux';
import styles from './Message.css';

class Message extends React.Component {
    componentDidMount() {
        let timerID = setInterval( () => {
            if( new Date().getTime() >= this.props.message.lifeTime ) {
                this.props.closeMessage();
                clearInterval( timerID );
            }
        }, 100 );
    }

    render() {
        return (
            <div className={`${styles.Message} ${styles[`${this.props.message.color}`]}`}>
                <span>{this.props.message.text}</span>
            </div>
        )
    }
}

//===============================================================

function mapStateToProps( state ) {
    return {
        message: state.message
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        closeMessage: () => {
            dispatch({
                type: "CLOSE_MESSAGE"
            })
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Message );