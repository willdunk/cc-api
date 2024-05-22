import * as yup from 'yup';

export const PostRefreshInputSchema = yup.object().shape({
    refreshToken: yup.string().required(),
});