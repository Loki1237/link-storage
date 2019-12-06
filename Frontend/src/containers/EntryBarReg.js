import { connect } from 'react-redux';
import { open_aut_bar } from '../actions/index';
import EntryBarReg from '../Components/EntryBarReg';

function mapStateToProps( state ) {
  return {
    components: state.components,
    elementNames: state.elementNames
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    open_aut_bar: () => dispatch( open_aut_bar ),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( EntryBarReg )