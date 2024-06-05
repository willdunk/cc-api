import { RefreshToken, User } from "../../models/user";
import { decode } from "../jwt/decode";
import { isDefined } from "../../utils/ts/isDefined";
import { sha256Hash } from "../../utils/hash";

const findMatchingRefreshToken = (refreshTokenToInvalidate: string) => (refreshTokenHash: RefreshToken): boolean => {
    const now = new Date();
    if (refreshTokenHash.expiresOn > now && !refreshTokenHash.invalid) {
        // Check if the refresh token is valid
        return sha256Hash(refreshTokenToInvalidate) === refreshTokenHash.refreshTokenHash;
    }
    return false;
}

export const logout = async (refreshToken: string): Promise<boolean> => {
    const decodedUser = decode(refreshToken, 'refresh');
    const userId = decodedUser.userId;

    const userRefreshHashes = (await User.findById(userId))?.refreshTokenHashes;

    if (isDefined(userRefreshHashes)) {
        const foundRefreshHash = userRefreshHashes?.find(findMatchingRefreshToken(refreshToken));
        await User.findByIdAndUpdate(userId,
            { $set: { 'refreshTokenHashes.$[elem].invalid': true } },
            { arrayFilters: [{ 'elem.refreshTokenHash': foundRefreshHash?.refreshTokenHash }] }
        );
    }
    return true;
}