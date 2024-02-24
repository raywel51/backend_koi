import e, {Request, Response} from "express";
import {VisitorLogRepository} from "../../repository/VisitorLogRepository";
import {convertNormalTime} from "../../helper/TimeFormator";

export const ApproveLinkController = async (req: Request, res: Response) => {
    try {
        const { key } = req.params;

        const visitorLogRepository = VisitorLogRepository.getInstance()
        const visitorExists = await visitorLogRepository.getByQrKey(key)

        const name = visitorExists?.visitor_name
        const phoneNumber = visitorExists?.mobile_phone
        const email = visitorExists?.email
        const date = convertNormalTime(new Date())
        const contact_about = visitorExists?.contact_about
        const location = visitorExists?.location

        const confirmUrl =  process.env.HOST_NAME +'/v1/approve/' + visitorExists?.qrKey

        return res.render('approve', {
            pageTitle: 'Visitor Registration',
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            date: date,
            confirmUrl: confirmUrl,
            contact_about: contact_about,
            location: location
        });
        
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            status: false,
            message: 'An unexpected error occurred.',
            err: e
        });
    }
}