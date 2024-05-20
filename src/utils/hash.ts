import bcrypt from 'bcryptjs';

export const hash = async (raw: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(raw, salt);
    } catch (error) {
        throw new Error('Raw string hashing failed');
    }
}