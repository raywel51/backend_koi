import {Request, Response} from "express";
export const LoginWebController = async (req: Request, res: Response) => {
    try {

        const token = req.cookies.token;
        if (token) {
            return res.redirect('/main');
        } {
            return res.render('login', {
                pageTitle: 'LETMEIN: Smart Living and Workplace Platform',
            });
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