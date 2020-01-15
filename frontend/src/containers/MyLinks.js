import { connect } from 'react-redux';
import { 
    OpenAddLink, 
    OpenChangeLink, 
    OpenShowHiddenLinks
} from '../actions/index';
import MyLinks from '../components/MyLinks';

function mapStateToProps(state) {
    return {
        modal: state.modal,
        appData: state.appData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openModalAddLink: () => dispatch(OpenAddLink),
        openModalChangeLink: () => dispatch(OpenChangeLink),
        openModalShowHiddenLinks: () => dispatch(OpenShowHiddenLinks)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyLinks);
