import { connect } from 'react-redux';
import { openChangePassword, openChangePINcode, openDeleteUser, setLanguage, closeUserMenu } from '../actions/index';
import UserMenu from '../components/UserMenu';

function mapStateToProps( state ) {
    return {
        modal: state.modal,
        elementNames: state.elementNames
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        openModalChangePassword: () => dispatch( openChangePassword ),
        openModalChangePINcode: () => dispatch( openChangePINcode ),
        openModalDeleteUser: () => dispatch( openDeleteUser ),
        closeUserMenu: () => dispatch( closeUserMenu ),
        setLanguage: ownProps => dispatch( setLanguage( ownProps ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( UserMenu )