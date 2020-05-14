import { withFormik } from 'formik';
import RegisterForm from '../components/RegisterForm'
import validateForm from 'utils/validate'

export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        normal_login_email: '',
        normal_login_confirm: '',
        normal_login_password: ''
    }),
    validate: values => {
        let errors = {};

        validateForm({ isAuth: false, values, errors })

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