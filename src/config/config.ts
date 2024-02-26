import dotenv from "dotenv";
import {DataSource} from "typeorm";
import {VisitorLogEntity} from "../entity/VisitorLogEntity";
import {GenqrcodeEntity} from "../entity/GenqrcodeEntity";
import {Locationtype} from "../entity/Locationtype";
import {ContactEntity} from "../entity/ContactEntity";
import {UserEntity} from "../entity/UserEntity";

dotenv.config({path: `.env.${process.env.NODE_ENV}`});

const port: number | undefined = process.env.DB_PORT as number | undefined;
export const AppDataSource = new DataSource(
    {
        type: "mysql",
        host: process.env.DB_HOST,
        port: port,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: false,
        entities: [
            VisitorLogEntity,
            GenqrcodeEntity,
            Locationtype,
            ContactEntity,
            UserEntity
        ],
        migrations: [],
        subscribers: [],
    })