import {Request, Response} from "express";
import {UserRepository} from "../../repository/UserRepository";

export const CheckInViewController = async (req: Request, res: Response) => {

    try {
        const token = req.cookies.token;
        if (token) {

            const userRepository = UserRepository.getInstance()
            const userByToken = await userRepository.getByToken(token.split('=')[1])

            return res.render('check_in_views', {
                pageTitle: 'Visitor Registration',
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