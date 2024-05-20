import { TokenType } from "./types"

//TODO: @willdunk: Replace these OMG
export const secrets = {
    'accessTokenSecret': 'lol',
    'refreshTokenSecret': 'lmao'
}

export const secretsMap: { [Key in TokenType]: keyof typeof secrets } = {
    'access': 'accessTokenSecret',
    'refresh': 'refreshTokenSecret',
}