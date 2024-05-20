import { connectDB } from './config/db';
import express from 'express';
import usersRouter from './routers/user';
import bodyParser from 'body-parser';

const port = 3000;

const main = async () => {
    try {
        await connectDB("mongodb://localhost:27017/cc");
        console.log("MongoDB Connected");

        const app = express();
        console.log("Created express app");

        let jsonParser = bodyParser.json();

        app.use(jsonParser);

        app.use('/users', usersRouter);

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