import { connect } from 'react-redux';
import { authorization, showMessage } from '../actions/index';
import EntryBarAut from '../components/EntryBarAut';

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

export default connect( mapStateToProps, mapDispatchToProps )( EntryBarAut )