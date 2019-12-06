import { connect } from 'react-redux';
import { open_reg_bar, open_my_links, authorization } from '../actions/index';
import EntryBarAut from '../Components/EntryBarAut';

function mapStateToProps( state ) {
  return {
    components: state.components,
    elementNames: state.elementNames
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    authorization: ownProps => dispatch( authorization( ownProps ) ),
    open_reg_bar: () => dispatch( open_reg_bar ),
    open_my_links: () => dispatch( open_my_links )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( EntryBarAut )