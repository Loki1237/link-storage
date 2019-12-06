export default function( state, action ) {
  if( state === undefined ) {
    return {}
  }

  if( action.type === "OPEN_AUT_BAR" ) {
    return { AutBar: true }
  }

  if( action.type === "OPEN_REG_BAR" ) {
    return { RegBar: true }
  }

  if( action.type === "OPEN_MY_LINKS" ) {
    return { MyLinks: true }
  }

  if( action.type === "OPEN_USER_MENU" ) {
    return { MyLinks: true, UserMenu: true }
  }

  if( action.type === "CLOSE_ALL_COMPONENTS" ) {
    return {}
  }

  return state;
}