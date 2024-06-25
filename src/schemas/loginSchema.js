import * as yup from 'yup';

const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}/;

const errorMessage = 'use lowercase , uppercase and digits';

const loginSchema = yup.object().shape({
    username : yup.string().min(5).max(30).required('username is required'),
    //password : yup.string().min(8).max(30).required()
    password : yup.string().min(8).max(25).matches(passwordPattern, {message : errorMessage}).required('password is required')
})

export default loginSchema;