import {Request, Response} from "express";
import axios from "axios";

export const HistoryWebController = async (req: Request, res: Response): Promise<void | Response> => {
    try {
        const token = req.cookies.token;
        if (token) {
            const response = await axios.get(process.env.HOST_NAME+'/api/v1/history')

            return res.render('history', {
                pageTitle: 'LETMEIN: Smart Living and Workplace Platform',
                data: response.data.data,
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