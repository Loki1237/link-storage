import { connect } from 'react-redux';
import { showMessage } from '../actions/index';
import EntryBarReg from '../components/EntryBarReg';

function mapStateToProps( state ) {
    return {
        elementNames: state.elementNames
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        authorization: ownProps => dispatch( authorization( ownProps ) ),
        showMessage: ownProps => dispatch( showMessage( ownProps ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( EntryBarReg )