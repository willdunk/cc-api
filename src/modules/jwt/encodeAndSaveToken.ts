
import { type RefreshToken, User } from '../../models/user';
import { hash } from '../../utils/hash';
import { encode } from './encode';
import { Tokens } from './types';

export const encodeAndSaveToken = async (userId: string): Promise<Tokens> => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const { accessToken, refreshToken } = encode(userId);

    const expiresOn = new Date();
    expiresOn.setDate(expiresOn.getDate() + REFRESH_DAYS_EXPIRATION);

    const newRefreshTokenHash = await hash(refreshToken);
    const newRefreshTokenObject: RefreshToken = { refreshTokenHash: newRefreshTokenHash, expiresOn };

    // TODO: @willdunk: user updates for mongoose are not propagating types to all attributes
    await user.updateOne({ '$addToSet': { refreshTokenHashes: newRefreshTokenObject } });

    return { accessToken, refreshToken };
}