import * as yup from 'yup';

export const filterObject = (obj: any, Schema: yup.ObjectSchema<any>) => {
    return Schema.cast(obj, { stripUnknown: true });
};