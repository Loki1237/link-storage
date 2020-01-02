import { connect } from 'react-redux';
import { openAddLink, openChangeLink, openShowHiddenLinks, showMessage } from '../actions/index';
import MyLinks from '../components/MyLinks';

function mapStateToProps( state ) {
    return {
        modal: state.modal,
        user: state.user,
        elementNames: state.elementNames
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        openModalAddLink: () => dispatch( openAddLink ),
        openModalChangeLink: () => dispatch( openChangeLink ),
        openModalShowHiddenLinks: () => dispatch( openShowHiddenLinks ),
        showMessage: ownProps => dispatch( showMessage( ownProps ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( MyLinks )