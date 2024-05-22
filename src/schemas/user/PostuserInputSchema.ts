import * as yup from 'yup';

export const PostUserInputSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    brokerLicenseNumber: yup.string().optional(),
    password: yup.string().required(),
});