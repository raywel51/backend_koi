import {Request, Response} from 'express';
import {testSentEmail} from "../helper/MailHelper";
import {ContactRepository} from "../repository/ContactRepository";
import {LocationRepository} from "../repository/LocationRepository";

export const BasicController = async (req: Request, res: Response) => {

    // testSentSMS("0656876818").then(r => {
    //     console.log(r)
    // })
    //testSentEmail()

    const contactRepository = ContactRepository.getInstance()
    const locationRepository = LocationRepository.getInstance()
    const contactList = await contactRepository.get();
    const locationList = await locationRepository.get();

    return res.render('VisitorRegister', {
        pageTitle: 'Visitor Registration',
        locationList: locationList, // Make sure locationList is properly defined and passed
        contactList: contactList // Assuming you also need to pass contactList
    });
};
