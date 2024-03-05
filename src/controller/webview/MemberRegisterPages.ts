import {Request, Response} from "express";
import {ContactRepository} from "../../repository/ContactRepository";
import {LocationRepository} from "../../repository/LocationRepository";
import {UserRepository} from "../../repository/UserRepository";

export const MemberRegisterPages = async (req: Request, res: Response) => {

    try {
        const token = req.cookies.token;
        if (token) {

            const userRepository = UserRepository.getInstance()
            const userByToken = await userRepository.getByToken(token.split('=')[1])

            const contactRepository = ContactRepository.getInstance()
            const locationRepository = LocationRepository.getInstance()
            const contactList = await contactRepository.get();
            const locationList = await locationRepository.get();

            return res.render('member_register_views', {
                pageTitle: 'Visitor Registration',
                locationList: locationList,
                contactList: contactList,
                username: userByToken?.name
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