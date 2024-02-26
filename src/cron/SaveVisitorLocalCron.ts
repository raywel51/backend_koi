import cron from "node-cron";
import {VisitorInterface} from "../interface/VisitorInterface";
import {DatabaseManager} from "../repository/DatabaseManager";
import {VisitorLogRepository} from "../repository/VisitorLogRepository";
import {convertNormalTime} from "../helper/TimeFormator";

export const saveVisitorLocalCron = () => {
    const dbManager = DatabaseManager.getInstance();

    cron.schedule('0 * * * *', async () => {
        console.log('This runs every hour!');
        await dbManager.removeDatabaseFile();
        await dbManager.loadDatabase()

        const visitorLogRepository = VisitorLogRepository.getInstance()
        const existsByApprove = await visitorLogRepository.existsByApprove()

        for (const item of existsByApprove) {
            const create_time = new Date(item.create_time);
            const entry_time = new Date(item.entry_time);
            const exit_time = new Date(item.exit_time);
            const visitor: VisitorInterface = {
                id: item.id,
                pin_code: item.pinCode,
                qr_key: item.qrKey,
                visitor_name: item.visitor_name,
                location: item.location,
                contact_about: item.contact_about,
                mobile_phone: item.mobile_phone,
                email: item.email,
                car_registration: item.car_registration,
                create_time: convertNormalTime(create_time),
                entry_time: convertNormalTime(entry_time),
                exit_time: convertNormalTime(exit_time),
                approve: item.approve
            };

            await dbManager.saveVisitor(visitor);
        }
        
    });
}