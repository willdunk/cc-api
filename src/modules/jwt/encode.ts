import jwt from 'jsonwebtoken';
import { JWTBody, Tokens } from "./types";
import { secretsMap } from './secrets';
import { ACCESS_MINUTES_EXPIRATION, REFRESH_DAYS_EXPIRATION } from './constants';
import { isDefined } from '../../utils/ts/isDefined';

export const encode = (userId: string): Tokens => {
    const body: JWTBody = { userId };
    const accessTokenSecret = secretsMap('access');
    const refreshTokenSecret = secretsMap('refresh');
    if (!isDefined(accessTokenSecret) || !isDefined(refreshTokenSecret)) {
        throw new Error("Cannot find jwt secret keys");
    }
    const accessToken = jwt.sign(body, accessTokenSecret, { expiresIn: `${ACCESS_MINUTES_EXPIRATION}m` });
    const refreshToken = jwt.sign(body, refreshTokenSecret, { expiresIn: `${REFRESH_DAYS_EXPIRATION}d` });

    return { accessToken, refreshToken };
}