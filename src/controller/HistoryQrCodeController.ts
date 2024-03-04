import {Request, Response} from "express";
import {VisitorLogRepository} from "../repository/VisitorLogRepository";
import {convertNormalTime} from "../helper/TimeFormator";

export const HistoryQrCodeController = async (req: Request, res: Response) => {
    const visitorLogRepository = VisitorLogRepository.getInstance()

    const data = await visitorLogRepository.get()
    let arrangeData: {}[] = [];

    data.forEach((item) => {
        const create_time = new Date(item.create_time);
        const entry_time = new Date(item.entry_time);
        const exit_time = new Date(item.exit_time);
        arrangeData.push({
            'id': item.id,
            'pin_code': item.pinCode,
            'qr_key': item.qrKey,
            'visitor_name': item.visitor_name,
            'location' : item.location,
            'contact_about' : item.contact_about,
            'mobile_phone' : item.mobile_phone,
            'email' : item.email,
            'car_registration' : item.car_registration,
            'create_time' : convertNormalTime(create_time) +' น.',
            'create_time_raw' : create_time,
            'entry_time' : convertNormalTime(entry_time) +' น.',
            "exit_time": convertNormalTime(exit_time) +' น.',
            "exit_time_raw": exit_time,
            "approve": item.approve,
            "channel": item.channel,
            qr_image: process.env.HOST_NAME + '/api/v1/qrcode/' + item.qrKey,
            approve_link: process.env.HOST_NAME + '/api/v1/approve/' + item.qrKey,
        })
    })

    return res.status(200).json({
        status: true,
        message: 'Data Is Ok',
        data: arrangeData
    })
}