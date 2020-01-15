import { connect } from 'react-redux';
import { OpenUserMenu } from '../actions/index';
import NavBar from '../components/NavBar';

function mapStateToProps(state) {
    return {
        appData: state.appData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openUserMenu: () => dispatch(OpenUserMenu)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
