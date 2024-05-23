import * as yup from 'yup';

export const postRefreshInputSchema = yup.object().shape({
    refreshToken: yup.string().required(),
});