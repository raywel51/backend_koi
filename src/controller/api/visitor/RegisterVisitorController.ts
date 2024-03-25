import e, {Request, Response} from "express";
import QRCode from 'qrcode';
import {RegisterRequestModel} from "../../../model/RegisterRequestModel";
import {generatePinCode, generateQrKey} from "../../../helper/GenerateValueKey";
import {VisitorLogRepository} from "../../../repository/VisitorLogRepository";
import {VisitorLogEntity} from "../../../entity/VisitorLogEntity";
import {testSentSMS} from "../../../helper/SMSHelper";
import {testSentEmail} from "../../../helper/MailHelper";
import {convertNormalTime} from "../../../helper/TimeFormator";
import {NotifyHelper} from "../../../helper/NotifyHelper";

export const RegisterVisitorController = async (req: Request, res: Response): Promise<e.Response> => {
    try {

        const visitorLogRepository = VisitorLogRepository.getInstance()

        const visitorData: RegisterRequestModel = new RegisterRequestModel(req.body);

        const validationError: string | undefined = visitorData.validate();
        if (validationError !== undefined) {
            return res.status(400).json({
                status: false,
                message: validationError,
            });
        }

        let pinCode: string
        let qrKey: string

        while (true) {
            pinCode = generatePinCode();
            qrKey = generateQrKey();

            const visitorExists = await visitorLogRepository.existsByPinCode(pinCode, qrKey)

            if (!visitorExists) {
                console.log(`Unique pinCode: ${pinCode}, qrKey: ${qrKey}`);
                break;
            }
        }

        const visitorLogEntity: any = Object.assign(new VisitorLogEntity(), {
            qrKey: qrKey,
            pinCode: pinCode,
            visitor_name: visitorData.visitor_name,
            location: visitorData.place,
            contact_about: visitorData.contact,
            mobile_phone: visitorData.mobile_phone,
            email: visitorData.email,
            car_registration: visitorData.plate,
            approve: 0,
            entry_time: visitorData.start_time,
            exit_time: visitorData.final_time,
            channel: "WebVisitor",
            create_by: ""
        })

        await visitorLogRepository.create(visitorLogEntity)

        let date = new Date();

        // await testSentSMS(visitorData.mobile_phone, qrKey)
       testSentEmail(
           visitorData.visitor_name,
           visitorData.mobile_phone,
           visitorData.email,
           convertNormalTime(date),
           qrKey,
       )
       await NotifyHelper(visitorLogEntity, qrKey)

        return res.status(200).json({
            status: true,
            message: 'QR code has been generated successfully.',
            data: visitorLogEntity,
            qr_image: process.env.HOST_NAME + '/v1/qrcode/' + qrKey,
            approve_link: process.env.HOST_NAME + '/v1/approve/' + qrKey,
        });
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            status: false,
            message: 'An unexpected error occurred.',
            err: e
        });
    }
};