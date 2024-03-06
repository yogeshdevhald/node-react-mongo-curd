import * as Yup from 'yup';

const validationSchema = Yup.object({
    firstname: Yup.string().required('Firstname is required'),
    Lastname:Yup.string().required('lastname is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().min(10, 'Password must be at least  characters').required('phone is required'),
});

export default validationSchema;