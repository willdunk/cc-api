import * as yup from 'yup';

export const postLoginInputSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});