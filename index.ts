import express, {Application} from 'express';
import apiRouter from './src/routes/ApiRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';

import {AppDataSource} from "./src/config/config";
import path from "node:path";
import {VisitorInterface} from "./src/interface/VisitorInterface";
import {DatabaseManager} from "./src/repository/DatabaseManager";
import {saveVisitorLocalCron} from "./src/cron/SaveVisitorLocalCron";

dotenv.config({path: `.env.${process.env.NODE_ENV}`});

const port = process.env.PORT || 3000

AppDataSource.initialize().then(async () => {
    const app: Application = express();

    app.use(cors())
    app.use(cookieParser())
    app.use(express.json({limit: '100000000mb'}));
    app.use(express.urlencoded({extended: true}))
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'src', 'views'));

    app.use('/assets', express.static(path.join(__dirname, 'asset')));
    app.use('/', apiRouter);

    saveVisitorLocalCron()

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });

}).catch(error => {
    console.error(error);
    process.exit(1);
});
