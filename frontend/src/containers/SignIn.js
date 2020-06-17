import { connect } from 'react-redux';
import SignIn from '../components/AuthBar/SignIn';
import { signIn } from '../actions/auth';

function mapStateToProps(state) {
    return {
        isAuthorized: state.auth.isAuthorized
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signIn: (login, password) => dispatch(signIn(login, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
