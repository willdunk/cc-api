import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { createNewUser } from '../modules/user/createNewUser';
import { PostUserInputSchema } from '../schemas/user/PostUserInputSchema';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const validatedRequestBody = PostUserInputSchema.validateSync(req.body);
        await createNewUser(validatedRequestBody);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req: Request, res: Response) => {
    const users = await User.find().lean().exec();
    res.json(users);
});

export default router;