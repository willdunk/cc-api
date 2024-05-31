import { TokenType } from "./types"

export const secretsMap = (tokenType: TokenType) => {
    return {
        'access': process.env.JWT_ACCESS_TOKEN_SECRET,
        'refresh': process.env.JWT_REFRESH_TOKEN_SECRET,
    }[tokenType];
}