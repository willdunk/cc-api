import { type RefreshToken, User } from "../../models/user";
import { isDefined } from "../../utils/ts/isDefined";
import { encodeAndSaveToken } from "../jwt/encodeAndSaveToken";
import { decode } from "../jwt/decode";
import { type Tokens } from "../jwt/types";

export const refresh = async (refreshToken: string): Promise<Tokens> => {
    const decodedUser = decode(refreshToken, 'refresh');
    const user = await User.findById(decodedUser.userId);
    if (!user) {
        throw new Error('User not found');
    }

    // TODO: @willdunk: This is just straight up wrong. A hash will never be equal to the raw string that a user can provide. This comparison should be using bcrypt to compare
    const matchingToken: RefreshToken | undefined = user.refreshTokenHashes?.find(token => token.refreshTokenHash === refreshToken);

    if (isDefined(matchingToken) && matchingToken.expiresOn < new Date()) {
        throw new Error('Unable to refresh token');
    }

    return await encodeAndSaveToken(user._id);
}