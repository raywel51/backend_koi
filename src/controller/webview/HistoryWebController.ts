import { Request, Response } from "express";
import axios from "axios";
import { ContactRepository } from "../../repository/ContactRepository";
import { LocationRepository } from "../../repository/LocationRepository";
import { RegisterRequestModel } from "../../model/RegisterRequestModel";
import { UserRepository } from "../../repository/UserRepository";

export const HistoryWebController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const token = req.cookies.token;
    console.log("token = " + token);
    if (token) {
      const userRepository = UserRepository.getInstance();
      const userByToken = await userRepository.getByToken(token);

      const response = await axios.get(
        process.env.HOST_NAME + "/api/v1/history",
        {
          headers: {
            Authorization: `Bearer token=${token}`,
          },
        }
      );

      const contactRepository = ContactRepository.getInstance();
      const locationRepository = LocationRepository.getInstance();
      const contactList = await contactRepository.get();
      const locationList = await locationRepository.get();

      console.log(userByToken?.token);
      return res.render("history", {
        pageTitle: "Visitor Information Form",
        data: response.data.data,
        name: response.data.data.visitor_name,
        username: userByToken?.username,
        locationList: locationList,
        contactList: contactList,
      });
    } else {
      res.redirect("/login");
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
