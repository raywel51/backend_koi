import {Request, Response} from "express";
import {ContactRepository} from "../../repository/ContactRepository";
import {LocationRepository} from "../../repository/LocationRepository";

export const MemberRegisterPages = async (req: Request, res: Response) => {

    try {
        const token = req.cookies.token;
        if (token) {
            const contactRepository = ContactRepository.getInstance()
            const locationRepository = LocationRepository.getInstance()
            const contactList = await contactRepository.get();
            const locationList = await locationRepository.get();

            return res.render('member_register_views', {
                pageTitle: 'Visitor Registration',
                locationList: locationList,
                contactList: contactList,
                username: 'koi'
            });
        } else {
            res.redirect('/login')
        }
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            status: false,
            message: 'An unexpected error occurred.',
            err: e
        });
    }
}