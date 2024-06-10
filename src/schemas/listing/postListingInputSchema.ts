import * as yup from 'yup';

export const postListingInputSchema = yup.object().shape({
    address: yup.string().required(),
    externalListingLinks: yup.array().of(
        yup.object().shape({
            provider: yup.string().required(),
            url: yup.string().required(),
        })
    ),
    listingDate: yup.date(),
    listingPrice: yup.number(),
});