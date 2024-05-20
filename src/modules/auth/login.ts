import { User } from "../../models/user";
import bcrypt from 'bcryptjs';
import { encodeAndSaveToken } from "../jwt/encodeAndSaveToken";
import { type Tokens } from "../jwt/types";

export const login = async (email: string, password: string): Promise<Tokens> => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return await encodeAndSaveToken(user._id);
}