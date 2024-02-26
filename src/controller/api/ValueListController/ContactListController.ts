import {Request, Response} from "express";
import {ContactRepository} from "../../../repository/ContactRepository";

export const ContactListController = async (req: Request, res: Response) => {
    try {
        const contactRepository = ContactRepository.getInstance()
        const data = await contactRepository.get()
        return res.status(200).json({
            status: true,
            message: 'Data IS Ok.',
            data
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