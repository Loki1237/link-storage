const EnglishNames = {
  language: "english",
  UserMenu: {
    header: "Settings",
    changePass: "Change password",
    changePIN: "Change PIN-code",
    delProfile: "To remove the profile",
    lang: {
      itemName: "Language",
      rus: "Русский",
      eng: "English"
    },
    exit: "Exit"
  },
  MyLinks: {
    showHidden: "Show hidden",
    hideHidden: "Hide hidden",
    newBookmark: "New bookmark",
    search: "Search",
    dropdown: {
      open: "Open",
      openInNewWindow: "Open in new window",
      copy: "Copy",
      edit: "Edit",
      remove: "Remove",
      cancel: "Cancel"
    },
    messageNotBookmarks: "Not bookmarks",
    messageCopyToClipboard: "Copied to the clipboard"
  },
  Modals: {
    AddLinkHeader: "New bookmark",
    ChangeLinkHeader: "To edit a bookmark",
    ChangePasswordHeader: "Change password",
    ChangePINcodeHeader: "Change PIN-code",
    DeleteUserText: "Once the profile is deleted, it will not be possible to restore it. Are you sure you want to continue?",
    ShowHiddenText: "Enter your PIN-code",
    buttonCancel: "Cancel",
    buttonAdd: "Add",
    buttonSave: "Save",
    buttonRemove: "Remove",
    buttonOk: "OK",
    labelHiddenBookmark: "Hidden bookmark",
    placeholderLinkName: "Name",
    placeholderLinkURL: "URL",
    placeholderOldPassword: "Old password",
    placeholderNewPassword: "New password",
    placeholderOldPINcode: "Old PIN-code",
    placeholderNewPINcode: "New PIN-code"
  },
  EntryBar: {
    AutBarHeader: "Authorization",
    RegBarHeader: "Registration",
    name: "Name",
    login: "Login",
    password: "Password",
    PINcode: "PIN-code",
    buttonRegistration: "Registration",
    buttonAuthorization: "Log in",
    buttonCancel: "Cancel",
    buttonContinue: "Continue",
    titlePassword: "Show/hide password",
    titlePINcode: "PIN-code is needed to display hidden bookmarks",
    errorOfLogIn: "Incorrect login or password. Please try again",
    errorOfServer: "Error: the server is temporarily unavailable",
    errorOfNotUniqueLogin: "A user with this login already exists",
    regErrorIncorrectName: "The incorrect name. Numbers or symbols are not allowed",
    regErrorIncorrectLogin: "Login must consist of English letters or letters with numbers and must not start with numbers",
    regErrorIncorrectPassword: "The password must consist only of digits and english letters",
    regErrorVeryShortPassword: "The password must contain at least 6 characters",
    regErrorIncorrectPINcode: "The PIN-code must consist of 4 digits",
    confirmOfRegistration: "Please make sure all data is correct. If everything is correct click <<continue>>",
    messageAboutReg: "The user successfully registered"
  }
}

const RussianNames = {
  language: "русский",
  UserMenu: {
    header: "Настройки",
    changePass: "Изменить пароль",
    changePIN: "Изменить ПИН-код",
    delProfile: "Удалить профиль",
    lang: {
      itemName: "Язык",
      rus: "Русский",
      eng: "English"
    },
    exit: "Выход"
  },
  MyLinks: {
    showHidden: "Показать скрытые",
    hideHidden: "Скрыть скрытые",
    newBookmark: "Новая закладка",
    search: "Поиск",
    dropdown: {
      open: "Открыть",
      openInNewWindow: "Открыть в новом окне",
      copy: "Копировать",
      edit: "Редактировать",
      remove: "Удалить",
      cancel: "Отмена"
    },
    messageNotBookmarks: "Нет закладок",
    messageCopyToClipboard: "Скопировано в буфер обмена"
  },
  Modals: {
    AddLinkHeader: "Новая закладка",
    ChangeLinkHeader: "Редактировать закладку",
    ChangePasswordHeader: "Изменить пароль",
    ChangePINcodeHeader: "Изменить ПИН-код",
    DeleteUserText: "После удаления профиля восстановить его будет невозможно. Вы уверены что хотите продолжить?",
    ShowHiddenText: "Введите ПИН-код",
    buttonCancel: "Назад",
    buttonAdd: "Добавить",
    buttonSave: "Сохранить",
    buttonRemove: "Удалить",
    buttonOk: "OK",
    labelHiddenBookmark: "Скрытая закладка",
    placeholderLinkName: "Название",
    placeholderLinkURL: "URL",
    placeholderOldPassword: "Старый пароль",
    placeholderNewPassword: "Новый пароль",
    placeholderOldPINcode: "Старый ПИН-код",
    placeholderNewPINcode: "Новый ПИН-код"
  },
  EntryBar: {
    AutBarHeader: "Авторизация",
    RegBarHeader: "Регистрация",
    name: "Имя",
    login: "Логин",
    password: "Пароль",
    PINcode: "ПИН-код",
    buttonRegistration: "Регистрация",
    buttonAuthorization: "Войти",
    buttonCancel: "Назад",
    buttonContinue: "Продолжить",
    titlePassword: "Показать/скрыть пароль",
    titlePINcode: "ПИН-код нужен для отображения скрытых закладок",
    errorOfLogIn: "Неверно введён логин или пароль. Пожалуйста попробуйте ещё раз",
    errorOfServer: "Ошибка: сервер временно недоступен",
    errorOfNotUniqueLogin: "Пользователь с таким логином уже существует",
    regErrorIncorrectName: "Некорректное имя. Не допускается использование цифр или символов",
    regErrorIncorrectLogin: "Логин должен состоять из английских букв или букв с цифрами и не должен начинаться с цифр",
    regErrorIncorrectPassword: "Пароль должен состоять только из цифр и английских букв",
    regErrorVeryShortPassword: "Пароль должен содержать не менее 6 символов",
    regErrorIncorrectPINcode: "ПИН-код должен состоять из 4 цифр",
    confirmOfRegistration: "Пожалуйста убедитесь что все данные верны. Если всё верно нажмите <<продолжить>>",
    messageAboutReg: "Пользователь успешно зарегистрирован"
  }
}

export default function( state, action ) {
  if( state === undefined ) {
    return EnglishNames;
  }
  if( action.type === "SET_LANGUAGE" ) {
    if( action.lang === "rus" ) return RussianNames;
    if( action.lang === "eng" ) return EnglishNames;
    return EnglishNames;
  }
  return state;
}