import * as yup from 'yup';

export const postLogoutInputSchema = yup.object().shape({
    refreshToken: yup.string().required(),
});