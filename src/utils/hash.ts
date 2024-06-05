import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const bcryptHash = async (raw: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(raw, salt);
    } catch (error) {
        throw new Error('Raw string hashing failed');
    }
}

export const sha256Hash = (raw: string): string => {
    const hash = crypto.createHash('sha256');
    hash.update(raw);
    return hash.digest('hex');
}