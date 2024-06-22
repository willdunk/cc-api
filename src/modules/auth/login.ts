import { User } from '../../models/user';
import bcrypt from 'bcryptjs';
import { encode } from '../jwt/encode';

export const login = async (email: string, password: string): Promise<string> => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return await encode(user._id);
};
