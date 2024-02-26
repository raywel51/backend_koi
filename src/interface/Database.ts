import {VisitorInterface} from "./VisitorInterface";

export interface Database {
    update_time: string,
    visitors: VisitorInterface[];
}