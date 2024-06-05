import { connectViaMongoose } from './database/connectViaMongoose';
import express from 'express';
import usersRouter from './routers/user';
import loginRouter from './routers/login';
import logoutRouter from './routers/logout';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }
}

const main = async () => {
    try {
        dotenv.config();

        await connectViaMongoose();
        console.log("MongoDB Connected");

        const app = express();
        console.log("Created express app");

        app.use(cors());

        let jsonParser = bodyParser.json();
        app.use(jsonParser);

        app.use('/users', usersRouter);
        app.use('/login', loginRouter);
        app.use('/logout', logoutRouter);

        const port = Number(process.env.PORT);

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.log(error);
    }
}

main().catch(error => {
    console.error(error)
    process.exit(1)
});