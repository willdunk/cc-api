import * as yup from 'yup';

export const getUserOutputSchema = yup.object().shape({
    _id: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    brokerLicenseNumber: yup.string().optional(),
});