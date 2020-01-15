export default class Texts {
    constructor(lang) {
        this.rus = lang === "rus";
        this.eng = lang === "eng";

        this.UserMenu = {
            header: this.rus ? "Настройки" : 
                    this.eng ? "Settings" : "",
                    
            changePass: this.rus ? "Изменить пароль" : 
                        this.eng ? "Change password" : "",
                        
            changePIN: this.rus ? "Изменить ПИН-код" : 
                       this.eng ? "Change PIN-code" : "",

            delProfile: this.rus ? "Удалить профиль" : 
                        this.eng ? "To remove the profile" : "",

            language: this.rus ? "Язык" : 
                      this.eng ? "Language" : "",

            exit: this.rus ? "Выход" : 
                  this.eng ? "Exit" : "",
        };

        this.MyLinks = {
            secret: this.rus ? "Секретные" :
                    this.eng ? "Secret" : "",

            newBookmark: this.rus ? "Новая закладка" :
                         this.eng ? "New bookmark" : "",

            search: this.rus ? "Поиск" :
                    this.eng ? "Search" : "",
            
            title: this.rus ? "Секретная закладка" :
                   this.eng ? "Secret bookmark" : "",

            dropdown: {
                open: this.rus ? "Открыть" :
                      this.eng ? "Open" : "",
                      
                inNewWindow: this.rus ? "В новом окне" :
                                 this.eng ? "In new window" : "",

                copy: this.rus ? "Копировать" :
                      this.eng ? "Copy" : "",

                edit: this.rus ? "Редактировать" :
                      this.eng ? "Edit" : "",

                remove: this.rus ? "Удалить" :
                        this.eng ? "Remove" : ""
            },

            messageNotBookmarks: this.rus ? "Нет закладок" :
                                 this.eng ? "Not bookmarks" : ""
        };
        
        this.Modals = {
            AddLinkHeader: this.rus ? "Новая закладка" :
                           this.eng ? "New bookmark" : "",

            ChangeLinkHeader: this.rus ? "Редактировать закладку" :
                              this.eng ? "To edit a bookmark" : "",

            ChangePasswordHeader: this.rus ? "Изменить пароль" :
                                  this.eng ? "Change password" : "",

            ChangePINcodeHeader: this.rus ? "Изменить ПИН-код" :
                                 this.eng ? "Change PIN-code" : "",

            ShowSecretLinksHeader: this.rus ? "Отобразить секретные закладки" :
                                   this.eng ? "Display of the secret bookmark" : "",

            HideSecretLinksHeader: this.rus ? "Скрыть секретные закладки" :
                                   this.eng ? "Hide secret bookmarks" : "",

            DeleteUserHeader: this.rus ? "Удалить профиль" :
                              this.eng ? "To remove the profile" : "",

            DeleteUserText: this.rus ? "После удаления профиля восстановить его будет невозможно. Вы уверены что хотите продолжить?" :
                            this.eng ? "Once the profile is deleted, it will not be possible to restore it. Are you sure you want to continue?" : "",
            
            ShowHiddenText: this.rus ? "Введите ПИН-код" :
                            this.eng ? "Enter your PIN-code" : "",

            buttonCancel: this.rus ? "Назад" :
                          this.eng ? "Cancel" : "",

            buttonAdd: this.rus ? "Добавить" :
                       this.eng ? "Add" : "",

            buttonSave: this.rus ? "Сохранить" :
                        this.eng ? "Save" : "",

            buttonRemove: this.rus ? "Удалить" :
                          this.eng ? "Remove" : "",

            labelSecretBookmark: this.rus ? "Секретная закладка" :
                                 this.eng ? "Secret bookmark" : "",

            placeholderLinkName: this.rus ? "Название" :
                                 this.eng ? "Name" : "",

            placeholderPassword: this.rus ? "Пароль" :
                                 this.eng ? "Password" : "",

            placeholderNewPassword: this.rus ? "Новый пароль" :
                                    this.eng ? "New password" : "",

            placeholderNewPINcode: this.rus ? "Новый ПИН-код" :
                                   this.eng ? "New PIN-code" : ""
        };
        
        this.EntryBar = {
            AutBarHeader: this.rus ? "Авторизация" :
                          this.eng ? "Authorization" : "",

            RegBarHeader: this.rus ? "Регистрация" :
                          this.eng ? "Registration" : "",

            name: this.rus ? "Имя" :
                  this.eng ? "Name" : "",

            login: this.rus ? "Логин" :
                   this.eng ? "Login" : "",

            password: this.rus ? "Пароль" :
                      this.eng ? "Password" : "",

            PINcode: this.rus ? "ПИН-код" :
                     this.eng ? "PIN-code" : "",

            buttonRegistration: this.rus ? "Регистрация" :
                                this.eng ? "Registration" : "",

            buttonAuthorization: this.rus ? "Войти" :
                                 this.eng ? "Log in" : "",

            buttonCancel: this.rus ? "Назад" :
                          this.eng ? "Cancel" : "",

            buttonContinue: this.rus ? "Продолжить" :
                            this.eng ? "Continue" : "",

            titlePassword: this.rus ? "Показать/скрыть" :
                           this.eng ? "Show/hide" : "",

            titlePINcode:  this.rus ? "ПИН-код нужен для отображения секретных закладок" :
                           this.eng ? "PIN-code is needed to display secret bookmarks" : "",

            regErrorIncorrectName: this.rus ? "Некорректное имя. Не допускается использование цифр или символов" :
                                   this.eng ? "The incorrect name. Numbers or symbols are not allowed" : "",

            regErrorIncorrectLogin: this.rus ? "Логин должен состоять из английских букв или букв с цифрами и не должен начинаться с цифр" :
                                    this.eng ? "Login must consist of English letters or letters with numbers and must not start with numbers" : "",
            
            regErrorIncorrectPassword: this.rus ? "Пароль должен состоять только из цифр и английских букв" :
                                       this.eng ? "The password must consist only of digits and english letters" : "",
            
            regErrorVeryShortPassword: this.rus ? "Пароль должен содержать не менее 8 символов" :
                                       this.eng ? "The password must contain at least 8 characters" : "",
            
            regErrorIncorrectPINcode: this.rus ? "ПИН-код должен состоять из 4 цифр" :
                                      this.eng ? "The PIN-code must consist of 4 digits" : "",
            
            confirmOfRegistration: this.rus ? "Пожалуйста убедитесь что все данные верны. Если всё верно нажмите <<продолжить>>" :
                                   this.eng ? "Please make sure all data is correct. If everything is correct click <<continue>>" : "",
            
            messageAboutReg: this.rus ? "Пользователь успешно зарегистрирован" :
                             this.eng ? "The user successfully registered" : ""
        };

        this.Message = {
            copyToClipboard: this.rus ? "Скопировано" :
                             this.eng ? "Copied" : "",

            emptyField: this.rus ? "Заполните оба поля" :
                        this.eng ? "Fill in both fields" : "",

            incorrectPINcode: this.rus ? "Неверный ПИН код" :
                              this.eng ? "Incorrect PIN code" : "",

            incorrectPassword: this.rus ? "Неверный пароль" :
                               this.eng ? "Incorrect password" : "",

            emptyPINcode: this.rus ? "Введите ваш ПИН код" :
                          this.eng ? "Enter your PIN code" : "",

            newUserDataSaved: this.rus ? "Данные пользователя обновлены" :
                              this.eng ? "The user data is updated" : "",

            veryShortPassword: this.rus ? "Новый пароль должен содержать не менее 8 символов" :
                               this.eng ? "The new password must contain at least 8 characters" : "",

            incorrectNewPINcode: this.rus ? "Новый PIN-код должен состоять из 4 цифр" :
                                 this.eng ? "The new PIN-code must consist of 4 digits" : "",

            userIsDeleted: this.rus ? "Пользователь удалён" :
                           this.eng ? "The user is deleted" : "",

            errorOfLogIn: this.rus ? "Неверно введён логин или пароль. Пожалуйста попробуйте ещё раз" :
                          this.eng ? "Incorrect login or password. Please try again" : "",

            errorOfServer: this.rus ? "Ошибка: сервер временно недоступен" :
                           this.eng ? "Error: the server is temporarily unavailable" : "",

            errorOfNotUniqueLogin: this.rus ? "Пользователь с таким логином уже существует" :
                                   this.eng ? "A user with this login already exists" : "",

            messageAboutReg: this.rus ? "Пользователь успешно зарегистрирован" :
                             this.eng ? "The user successfully registered" : ""
        };
    }
}
