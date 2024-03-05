import e, {Request, Response} from "express";
import QRCode from 'qrcode';
import {RegisterRequestModel} from "../../../model/RegisterRequestModel";
import {generatePinCode, generateQrKey} from "../../../helper/GenerateValueKey";
import {VisitorLogRepository} from "../../../repository/VisitorLogRepository";
import {VisitorLogEntity} from "../../../entity/VisitorLogEntity";
import {UserRepository} from "../../../repository/UserRepository";
import jwt, {JwtPayload} from "jsonwebtoken";

export const RegisterCheckInController = async (req: Request, res: Response): Promise<e.Response> => {
    try {

        const visitorLogRepository = VisitorLogRepository.getInstance()
        const userRepository = UserRepository.getInstance()

        const visitorData: RegisterRequestModel = new RegisterRequestModel(req.body);
        const token = req.header('Authorization');

        if (!token) {
            return res.status(400).json({
                status: false,
                message: "no token",
            });
        }

        const userByToken = await userRepository.getByToken(token.split('=')[1])

        console.log(token)

        if (!userByToken) {
            return res.status(400).json({
                status: false,
                message: "token wrong",
            });
        }

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
            approve: true,
            entry_time: visitorData.start_time,
            exit_time: visitorData.final_time,
            channel: "WebUser",
            create_by: userByToken.name + userByToken.lastname
        })

        await visitorLogRepository.create(visitorLogEntity)

        let date = new Date();

        return res.status(200).json({
            status: true,
            message: 'QR code has been generated successfully.',
            data: visitorLogEntity,
            qr_image: process.env.HOST_NAME + '/api/v1/qrcode/' + qrKey,
            approve_link: process.env.HOST_NAME + '/api/v1/approve/' + qrKey,
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