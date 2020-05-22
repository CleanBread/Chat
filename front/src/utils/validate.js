export default ({ isAuth, values, errors }) => {

    const rules = {
        normal_login_email: (value) => {
            if (!value) {
                errors.normal_login_email = 'Введите email';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    value
                )
            ) {
                errors.normal_login_email = 'Некорректный email';
            }
        },
        normal_login_password: (value) => {
            if (!value) {
                errors.normal_login_password = 'Введите пароль'
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)) {
                errors.normal_login_password = isAuth ? 'Неверный пароль' : 'Слишком легкий пароль'
            }
    
        },
        normal_login_confirm: (value) => {
            if (!values.normal_login_password) {
                errors.normal_login_confirm = 'Введите пароль еще раз'
            } else if (values.normal_login_password !== value) {
                errors.normal_login_confirm = 'Пароли не совпадают'
            }
        }
    }

    
    Object.keys(values).forEach(
        key => (rules[key] && rules[key](values[key]))
    )

}