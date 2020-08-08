import { withFormik } from 'formik';
import RegisterForm from '../components/RegisterForm'
import validateForm from 'utils/validate'

import { userActions } from 'redux/actions';

import store from 'redux/store';

export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: '',
        fullname: '',
        confirm: '',
        password: ''
    }),
    validate: values => {
        let errors = {};

        validateForm({ isAuth: false, values, errors })

        return errors;
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        store.dispatch(userActions.userRegistration(values)).then(({ status }) => {
            props.history.push("/verify")
            setSubmitting(false)
        }).catch(() => {
            setSubmitting(false)
        })
    },

    displayName: 'RegisterForm', // helps with React DevTools
})(RegisterForm)