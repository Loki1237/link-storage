import { connect } from 'react-redux';
import SignUp from '../components/AuthBar/SignUp';
import { signUp } from '../actions/auth';

function mapStateToProps(state) {
    return {
        isAuthorized: state.auth.isAuthorized
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signUp: (name, login, password, PIN) => dispatch(signUp(name, login, password, PIN))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
