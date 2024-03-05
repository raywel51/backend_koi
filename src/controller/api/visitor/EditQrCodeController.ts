import {Request, Response} from "express";
import {VisitorLogRepository} from "../../../repository/VisitorLogRepository";
import {VisitorLogEntity} from "../../../entity/VisitorLogEntity";

export const EditQrCodeController = async (req: Request, res: Response) => {
    const { pinCode, visitor_name, contact, location, mobile, email, plate, start_time, final_time } = req.body

    const visitorLogRepository = VisitorLogRepository.getInstance()

    const visitorLogEntity: any = Object.assign(new VisitorLogEntity(), {
        pinCode: pinCode,
        visitor_name: visitor_name,
        location: location,
        contact_about: contact,
        mobile_phone: mobile,
        email: email,
        car_registration: plate,
        entry_time: start_time,
        exit_time: final_time,
    })

    try {
        await visitorLogRepository.update(visitorLogEntity)
    } catch (e) {
        console.log(e)
    }

    return res.status(200).json({
        status: true,
        message: 'QR code has been generated successfully.'
    });
}
