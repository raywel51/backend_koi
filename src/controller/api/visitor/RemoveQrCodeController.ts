import {Request, Response} from "express";
import {VisitorLogRepository} from "../../../repository/VisitorLogRepository";

export const RemoveQrCodeController = async (req: Request, res: Response) => {
    const { key } = req.params;
    const visitorLogRepository = VisitorLogRepository.getInstance()

    let dataQrKey;

    const pincode = key

    if (pincode.startsWith("http")) {
        // const qrKey = pincode.split("/").pop();
        // dataQrKey = await visitorLogRepository.getByQrKey(qrKey);
    } else {
        dataQrKey =
            pincode.length === 6
                ? await visitorLogRepository.getByPinCode(pincode)
                : await visitorLogRepository.getByQrKey(pincode);
    }

    if (!dataQrKey) {
        return res.status(400).json({
            status: false,
            message: "ไม่พบ QRCODE นี้ในระบบ",
        });
    }

    await visitorLogRepository.remove(dataQrKey.id)

    return res.status(200).json({
        status : true,
        message: "ระบบได้ลบ QRCode "+ dataQrKey.id + " เรียบร้อย!!",
    })
}
