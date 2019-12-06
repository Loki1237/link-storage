import { connect } from 'react-redux';
import { open_user_menu } from '../actions/index';
import NavBar from '../Components/NavBar';

function mapStateToProps( state ) {
  return {
    components: state.components,
    user: state.user,
    elementNames: state.elementNames
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    open_user_menu: () => dispatch( open_user_menu )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( NavBar )