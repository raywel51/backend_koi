import express, {Application} from 'express';
import apiRouter from './src/routes/ApiRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {AppDataSource} from "./src/config/config";
import path from "node:path";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT

AppDataSource.initialize().then(async () => {
    const app: Application = express();

    app.use(cors())
    app.use(cookieParser())
    app.use(express.json({ limit: '100000000mb' }));
    app.use(express.urlencoded({ extended: true }))
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'src', 'views'));

    app.use('/', apiRouter);

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });

}).catch(error => {
    console.error(error);
    process.exit(1); // Exit the process with a non-zero status code
});
