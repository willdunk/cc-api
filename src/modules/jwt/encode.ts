import jwt from 'jsonwebtoken';
import { JWTBody } from './types';
import { ACCESS_DAYS_EXPIRATION } from './constants';
import { isDefined } from '../../utils/ts/isDefined';

export const encode = (userId: string): string => {
    const body: JWTBody = { userId };
    const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    if (!isDefined(accessTokenSecret)) {
        throw new Error('Cannot find jwt secret keys');
    }
    const accessToken = jwt.sign(body, accessTokenSecret, {
        expiresIn: `${ACCESS_DAYS_EXPIRATION}d`,
    });

    return accessToken;
};
