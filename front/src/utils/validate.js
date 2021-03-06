export default ({ isAuth, values, errors }) => {

    const rules = {
        email: (value) => {
            if (!value) {
                errors.email = 'Введите email';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    value
                )
            ) {
                errors.email = 'Некорректный email';
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = 'Введите пароль'
            } else if (!isAuth && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)) {
                errors.password = 'Слишком легкий пароль'
            }

        },
        confirm: (value) => {
            if (!values.password) {
                errors.confirm = 'Введите пароль еще раз'
            } else if (values.password !== value) {
                errors.confirm = 'Пароли не совпадают'
            }
        },
        fullname: (value) => {
            if (!value) {
                errors.fullname = 'Введите Ваше имя'
            }
        },
    }


    Object.keys(values).forEach(
        key => (rules[key] && rules[key](values[key]))
    )

}