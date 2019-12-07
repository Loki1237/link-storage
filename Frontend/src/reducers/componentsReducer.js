export default function( state, action ) {
  if( state === undefined ) {
    return {}
  }

  switch( action.type ) {
    case "OPEN_AUT_BAR":
      return { AutBar: true };
    
    case "OPEN_REG_BAR":
      return { RegBar: true };

    case "OPEN_MY_LINKS":
      return { MyLinks: true };

    case "OPEN_USER_MENU":
      return { MyLinks: true, UserMenu: true }

    case "CLOSE_ALL_COMPONENTS":
      return {};
  }

  return state;
}