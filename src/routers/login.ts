import express, { Request, Response } from 'express';
import { RefreshToken, User } from '../models/user';
import bcrypt from 'bcryptjs';
import { encodeAndSaveToken } from '../modules/jwt/encodeAndSaveToken';
import { StatusCodes } from 'http-status-codes'
import { PostLoginInputSchema } from '../schemas/login/PostLoginInputSchema';
import { PostRefreshInputSchema } from '../schemas/login/PostRefreshInputSchema';
import { decode } from '../modules/jwt/decode';
import { isDefined } from '../utils/ts/isDefined';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { email, password } = PostLoginInputSchema.validateSync(req.body);
        const user = await User.findOne({ email });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "User Not Found" });
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

router.post('/refresh', async (req: Request, res: Response) => {
    try {
        const { refreshToken } = PostRefreshInputSchema.validateSync(req.body);
        const decodedUser = decode(refreshToken, 'refresh');
        const user = await User.findById(decodedUser.userId);
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "User Not Found" });
            return;
        }

        const matchingToken: RefreshToken | undefined = user.refreshTokenHashes?.find(token => {
            bcrypt.compareSync(refreshToken, token.refreshTokenHash);
        });

        if (isDefined(matchingToken) && matchingToken.expiresOn < new Date()) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Refresh Token Not Valid" });
            return;
        }

        const newTokens = await encodeAndSaveToken(user._id);
        res.status(StatusCodes.OK).json(newTokens);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    };
});

export default router;