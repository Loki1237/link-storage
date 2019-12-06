import { connect } from 'react-redux';
import { set_language, open_modal, close_user_menu } from '../actions/index';
import UserMenu from '../Components/UserMenu';

function mapStateToProps( state ) {
  return {
    modal: state.modal,
    elementNames: state.elementNames
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    open_modal: ( ownProps ) => dispatch( open_modal( ownProps ) ),
    close_user_menu: () => dispatch( close_user_menu ),
    set_language: ownProps => dispatch( set_language( ownProps ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( UserMenu )