import jwt from 'jsonwebtoken';
import { JWTBody, Tokens } from "./types";
import { secrets, secretsMap } from './secrets';

export const encode = (userId: string): Tokens => {
    const body: JWTBody = { userId };
    const accessToken = jwt.sign(body, secrets[secretsMap['access']], { expiresIn: `${ACCESS_MINUTES_EXPIRATION}m` });
    const refreshToken = jwt.sign(body, secrets[secretsMap['refresh']], { expiresIn: `${REFRESH_DAYS_EXPIRATION}d` });

    return { accessToken, refreshToken };
}