import { connect } from 'react-redux';
import { openUserMenu } from '../actions/index';
import NavBar from '../components/NavBar';

function mapStateToProps( state ) {
    return {
        user: state.user,
        elementNames: state.elementNames
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        openUserMenu: () => dispatch( openUserMenu )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( NavBar )