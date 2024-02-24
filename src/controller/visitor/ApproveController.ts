import e, {Request, Response} from "express";
import {VisitorLogRepository} from "../../repository/VisitorLogRepository";
import {testSentSMS} from "../../helper/SMSHelper";

export const ApproveController = async (req: Request, res: Response): Promise<e.Response> => {
    try {
        const { key } = req.params;

        const visitorLogRepository = VisitorLogRepository.getInstance()
        const visitorExists = await visitorLogRepository.getByQrKey(key)

        if (!visitorExists) {
            return res.status(400).json({
                status: false,
                message: 'This QrCode information was not found.',
            })
        }

        try {
            await visitorLogRepository.updateApprove(key)
        } catch (e) { }

        await testSentSMS(visitorExists.mobile_phone, visitorExists.qrKey)

        return res.json({
            status: true,
            message: 'The system has successfully approved.',
        })

    } catch (e) {
        console.error(e);

        return res.status(500).json({
            status: false,
            message: 'An unexpected error occurred.',
            err: e
        });
    }
}