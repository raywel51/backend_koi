import e, { Request, Response } from "express";
import { VisitorLogRepository } from "../../../repository/VisitorLogRepository";
import { VisitorLogEntity } from "../../../entity/VisitorLogEntity";

export const CheckGuestController = async (
  req: Request,
  res: Response
): Promise<e.Response> => {
  try {
    const visitorLogRepository = VisitorLogRepository.getInstance();

    const { pincode } = req.body;
    if (!pincode) {
      return res.status(400).json({
        status: false,
        message: "Please Enter Pin Code",
      });
    }

    let dataQrKey;

    if (pincode.startsWith("http")) {
      const qrKey = pincode.split("/").pop();
      dataQrKey = await visitorLogRepository.getByQrKey(qrKey);
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

    if (!dataQrKey.approve) {
      return res.status(400).json({
        status: false,
        message: "QR Code นี้ยังไม่ถูกอนุมัติ",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "QR Code นี้ได้รับการอนุมัติ",
      });
    }
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      status: false,
      message: "An unexpected error occurred.",
      err: e,
    });
  }
};
