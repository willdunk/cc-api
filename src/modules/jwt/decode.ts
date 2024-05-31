import jwt from 'jsonwebtoken';
import { isJWTBody, type JWTBody, type TokenType } from './types';
import { secretsMap } from './secrets';
import { isDefined } from '../../utils/ts/isDefined';

export const decode = (token: string, tokenType: TokenType): JWTBody => {
    const secret = secretsMap(tokenType);
    if (!isDefined(secret)) {
        throw new Error("Cannot find jwt secret key");
    }
    const decodedBody = jwt.verify(token, secret);
    if (isJWTBody(decodedBody)) return decodedBody
    throw new Error("Cannot decode jwt token");
}