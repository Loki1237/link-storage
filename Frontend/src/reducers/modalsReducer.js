export default function( state = null, action ) {
  if( !state ) {
    return "OFF"
  };

  if( action.type === "OPEN_MODAL" ) {
    return { 
      window: action.window,
      data: action.data
    }
  }

  if( action.type === "CLOSE_MODALS" ) {
    return "OFF";
  }

  return state;
}