import * as yup from 'yup';

export const getListingOutputSchema = yup.object().shape({
    _id: yup.string().required(),
    userId: yup.string().required(),
    address: yup.string().required(),
    externalListingLinks: yup.array().of(
        yup.object().shape({
            _id: yup.string().required(),
            provider: yup.string().required(),
            url: yup.string().required(),
        })
    ),
    listingDate: yup.date(),
    listingPrice: yup.number(),
});