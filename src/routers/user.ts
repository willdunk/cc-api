import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { createNewUser } from '../modules/user/createNewUser';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {

        // TODO: @willdunk: Auth this user
        // TODO: @willdunk: Validate this body input
        await createNewUser(req.body);

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