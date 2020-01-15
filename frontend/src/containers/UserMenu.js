import { connect } from 'react-redux';
import { 
    OpenChangePassword, 
    OpenChangePINcode, 
    OpenDeleteUser,
    CloseUserMenu,
    SetAppData
} from '../actions/index';
import UserMenu from '../components/UserMenu';

function mapStateToProps(state) {
    return {
        appData: state.appData,
        modal: state.modal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openModalChangePassword: () => dispatch(OpenChangePassword),
        openModalChangePINcode: () => dispatch(OpenChangePINcode),
        openModalDeleteUser: () => dispatch(OpenDeleteUser),
        closeUserMenu: () => dispatch(CloseUserMenu),
        setAppData: (ownProps) => dispatch(SetAppData(ownProps))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
