import { type RefreshToken, User } from "../../models/user";
import { isDefined } from "../../utils/ts/isDefined";
import { encodeAndSaveToken } from "../jwt/encodeAndSaveToken";
import { decode } from "../jwt/decode";
import { type Tokens } from "../jwt/types";
import bcrypt from 'bcryptjs';

export const refresh = async (refreshToken: string): Promise<Tokens> => {
    const decodedUser = decode(refreshToken, 'refresh');
    const user = await User.findById(decodedUser.userId);
    if (!user) {
        throw new Error('User not found');
    }

    const matchingToken: RefreshToken | undefined = user.refreshTokenHashes?.find(token => {
        bcrypt.compareSync(refreshToken, token.refreshTokenHash);
    });

    if (isDefined(matchingToken) && matchingToken.expiresOn < new Date()) {
        throw new Error('Unable to refresh token');
    }

    return await encodeAndSaveToken(user._id);
}