import express, { Request, Response } from 'express';
import { User } from '../models/user';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        // Get the user data from the request body
        const { firstName, lastName, email, password, brokerLicenseNumber } = req.body;

        // TODO: Validate the user data

        // TODO: Create the user in the database

        await User.create({
            firstName,
            lastName,
            email,
            passwordHash: password,
            refreshTokenHashes: { refreshTokenHash: 'asdf', expiresOn: new Date() },
            brokerLicenseNumber
        });

        // Send a response indicating success
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', (req: Request, res: Response) => {
    // Get all users from the database
    const users = User.find();

    // Send the users as a response
    res.json(users);
});

export default router;