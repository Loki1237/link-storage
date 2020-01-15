import { connect } from 'react-redux';
import EntryBarReg from '../components/EntryBarReg';

function mapStateToProps(state) {
    return {
        appData: state.appData
    };
}

export default connect(mapStateToProps)(EntryBarReg);
