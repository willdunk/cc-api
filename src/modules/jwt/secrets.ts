import { TokenType } from "./types"

export const secrets = {
    'accessTokenSecret': process.env.JWT_ACCESS_TOKEN_SECRET,
    'refreshTokenSecret': process.env.JWT_REFRESH_TOKEN_SECRET,
}

export const secretsMap: { [Key in TokenType]: keyof typeof secrets } = {
    'access': 'accessTokenSecret',
    'refresh': 'refreshTokenSecret',
}