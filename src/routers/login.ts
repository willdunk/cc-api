import express, { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import { encodeAndSaveToken } from '../modules/jwt/encodeAndSaveToken';
import { StatusCodes } from 'http-status-codes'
import { PostLoginInputSchema } from '../schemas/login/PostLoginInputSchema';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { email, password } = PostLoginInputSchema.validateSync(req.body);
        const user = await User.findOne({ email });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Internal Server Error" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
            return;
        }

        const newTokens = await encodeAndSaveToken(user._id);
        res.status(StatusCodes.OK).json(newTokens);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
});

export default router;