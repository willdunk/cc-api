import jwt from 'jsonwebtoken';
import { isJWTBody, type JWTBody } from './types';
import { isDefined } from '../../utils/ts/isDefined';

export const decode = (token: string): JWTBody => {
    const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
    if (!isDefined(secret)) {
        throw new Error('Cannot find jwt secret key');
    }
    const decodedBody = jwt.verify(token, secret);
    if (isJWTBody(decodedBody)) return decodedBody;
    throw new Error('Cannot decode jwt token');
};
