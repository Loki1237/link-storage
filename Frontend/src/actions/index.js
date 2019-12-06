export const set_language = ( ownProps ) => ({
  type: "SET_LANGUAGE",
  lang: ownProps.lang
})

export const open_aut_bar = {
  type: "OPEN_AUT_BAR"
}

export const open_reg_bar = {
  type: "OPEN_REG_BAR"
}

export const open_my_links = {
  type: "OPEN_MY_LINKS"
}

export const open_user_menu = {
  type: "OPEN_USER_MENU"
}

export const close_user_menu = {
  type: "OPEN_MY_LINKS"
}

export const open_modal = ( ownProps ) => ({
  type: "OPEN_MODAL",
  window: ownProps.window,
  data: ownProps.data || null 
})

export const authorization = ( ownProps ) => ({
  type: "AUTHORIZATION",
  data: ownProps.data
})