import LoginForm from '../components/LoginForm'
import { withFormik } from 'formik';
import validateForm from 'utils/validate'

export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        normal_login_email: '',
        normal_login_password: ''
    }),
    validate: values => {
        let errors = {};

        validateForm({ isAuth: true, values, errors })

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'RegisterForm', // helps with React DevTools
})(LoginForm)