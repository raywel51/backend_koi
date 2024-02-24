import { Request, Response } from "express";
import QRCode from "qrcode";

export const QrCodeController = async (req: Request, res: Response): Promise<void> => {
    const { key } = req.params;

    if (!key) {
        res.status(400).send('No data provided');
        return;
    }

    res.type('image/png');

    QRCode.toFileStream(res, key, {
        type: 'png',
        errorCorrectionLevel: 'H',
        margin: 1,
        color: {
            dark: "#403F3F",
            light: "#FFFFFF",
        },
        width: 340,
    }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error generating QR code');
        }
    });
};
