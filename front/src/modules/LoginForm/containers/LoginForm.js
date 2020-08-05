import LoginForm from '../components/LoginForm'
import { withFormik } from 'formik';
import validateForm from 'utils/validate'

import { userActions } from 'redux/actions';

import store from 'redux/store';

export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validate: values => {
        let errors = {};
        validateForm({ isAuth: true, values, errors })

        return errors;
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        store.dispatch(userActions.fetchUserLogin(values)).then(({ status }) => {
            if (status === 'success') {
                setTimeout(() => {
                    props.history.push("/im")
                }, 50)
            }
            setSubmitting(false)
        })
    },

    displayName: 'RegisterForm', // helps with React DevTools
})(LoginForm)