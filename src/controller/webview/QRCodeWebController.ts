import e, {Request, Response} from "express";
import {VisitorLogRepository} from "../../repository/VisitorLogRepository";

export const QRCodeWebController = async (req: Request, res: Response) => {
    try {
        const { key } = req.params;

        if (!key) {
            res.status(400).send('No data provided');
            return;
        }

        const visitorLogRepository = VisitorLogRepository.getInstance()
        const visitorExists = await visitorLogRepository.getByQrKey(key)

        if (!visitorExists) {
            return res.status(400).json({
                status: false,
                message: 'This QrCode information was not found.',
            })
        }

        return res.render('QRCode', {
            pageTitle: 'LETMEIN: Smart Living and Workplace Platform',
            imageUrl: '/v1/qrcode/' + visitorExists.qrKey,
            imageId: visitorExists.pinCode
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