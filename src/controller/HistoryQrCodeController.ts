import { Request, Response } from "express";
import { VisitorLogRepository } from "../repository/VisitorLogRepository";
import { convertNormalTime } from "../helper/TimeFormator";
import { UserRepository } from "../repository/UserRepository";

export const HistoryQrCodeController = async (req: Request, res: Response) => {
  const token = req.header("Authorization")?.split("=")[1];

  if (!token) {
    return res.status(400).json({
      status: false,
      message: "No token provided",
    });
  }

  console.log(token);

  try {
    const userRepository = UserRepository.getInstance();
    const userByToken = await userRepository.getByToken(token);

    if (!userByToken) {
      return res.status(400).json({
        status: false,
        message: "Invalid token",
      });
    }

    const visitorLogRepository = VisitorLogRepository.getInstance();
    let data;

    if (userByToken.role == "admin") {
      data = await visitorLogRepository.get();
    } else {
      data = await visitorLogRepository.getByUsername(
        userByToken.name + " " + userByToken.lastname
      );
    }

    if (!data) {
      return res.status(400).json({
        status: false,
        message: "No data found",
      });
    }

    const arrangeData = data.map((item) => {
      const create_time = new Date(item.create_time);
      const entry_time = new Date(item.entry_time);
      const exit_time = new Date(item.exit_time);
      return {
        id: item.id,
        pin_code: item.pinCode,
        qr_key: item.qrKey,
        visitor_name: item.visitor_name,
        location: item.location,
        contact_about: item.contact_about,
        mobile_phone: item.mobile_phone,
        email: item.email,
        car_registration: item.car_registration,
        create_time: convertNormalTime(create_time) + " น.",
        create_time_raw: create_time,
        entry_time: convertNormalTime(entry_time) + " น.",
        exit_time: convertNormalTime(exit_time) + " น.",
        exit_time_raw: exit_time,
        create_by: item.create_by,
        approve: item.approve,
        channel: item.channel,
        qr_image: `${process.env.HOST_NAME}/api/v1/qrcode/${item.qrKey}`,
        approve_link: `${process.env.HOST_NAME}/api/v1/approve/${item.qrKey}`,
      };
    });

    return res.status(200).json({
      status: true,
      message: "Data is OK",
      data: arrangeData,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
