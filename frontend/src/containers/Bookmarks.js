import { connect } from 'react-redux';
import { updateLinkList, createLink, changeLink, deleteLink, showHidden, resetState } from '../actions/links';
import Bookmarks from '../components/Bookmarks/Bookmarks';

function mapStateToProps(state) {
    return {
        isAuthorized: state.auth.isAuthorized,
        isFetching: state.links.isFetching,
        error: state.links.error,
        links: state.links.links,
        show: state.links.show
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateLinkList: () => dispatch(updateLinkList()),
        createLink: (name, URL, isVisible) => dispatch(createLink(name, URL, isVisible)),
        changeLink: (id, name, URL, isVisible) => dispatch(changeLink(id, name, URL, isVisible)),
        deleteLink: (id) => dispatch(deleteLink(id)),
        showHidden: (PIN) => dispatch(showHidden(PIN)),
        resetState: () => dispatch(resetState())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
