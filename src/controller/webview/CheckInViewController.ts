import {Request, Response} from "express";

export const CheckInViewController = async (req: Request, res: Response) => {

    try {
        const token = req.cookies.token;
        if (token) {

            return res.render('check_in_views', {
                pageTitle: 'Visitor Registration',
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