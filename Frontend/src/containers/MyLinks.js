import { connect } from 'react-redux';
import { open_modal } from '../actions/index';
import MyLinks from '../Components/MyLinks';

function mapStateToProps( state ) {
  return {
    modal: state.modal,
    user: state.user,
    elementNames: state.elementNames
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    open_modal: ( ownProps ) => dispatch( open_modal( ownProps ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( MyLinks )