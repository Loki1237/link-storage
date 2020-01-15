import { connect } from 'react-redux';
import { SetAppData } from '../actions/index';
import EntryBarAut from '../components/EntryBarAut';

function mapStateToProps(state) {
    return {
        appData: state.appData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setAppData: (ownProps) => dispatch(SetAppData(ownProps))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryBarAut);
