import jwt from 'jsonwebtoken';
import { isJWTBody, type JWTBody, type TokenType } from './types';
import { secrets, secretsMap } from './secrets';

export const decode = (token: string, tokenType: TokenType): JWTBody => {
    const decodedBody = jwt.verify(token, secrets[secretsMap[tokenType]]);
    if (isJWTBody(decodedBody)) return decodedBody
    throw new Error("Cannot decode jwt token");
}