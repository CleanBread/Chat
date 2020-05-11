import { withFormik } from 'formik';
import RegisterForm from '../components/RegisterForm'

export default withFormik({
    validate: values => {
        let errors = {};
        if (!values.normal_login_email) {
            errors.email = 'Введите email';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.normal_login_email
            )
        ) {
            errors.email = 'Некорректный email';
        }
        
        if (!values.normal_login_password) {
            errors.password = 'Введите пароль'
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(values.normal_login_password)) {
            errors.password = 'Слишком легкий пароль'
        }

        if (!values.normal_login_confirm) {
            errors.confirm = 'Введите пароль еще раз'
        } else if (values.normal_login_password !== values.normal_login_confirm) {
            errors.confirm = 'Пароли не совпадают'
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'RegisterForm', // helps with React DevTools
})(RegisterForm)