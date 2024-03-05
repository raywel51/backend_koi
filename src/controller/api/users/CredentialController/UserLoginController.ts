import e, {Request, Response} from "express";
import {UserRepository} from "../../../../repository/UserRepository";
import {PasswordEncrypt} from "../../../../helper/PasswordEncrypt";

import jwt from 'jsonwebtoken';

export const UserLoginController = async (req: Request, res: Response): Promise<e.Response> => {
    try {
        const userRepository = UserRepository.getInstance()

        const {username, password} = req.body

        if (!username || !password) {
            return res.status(400).json({
                status: false,
                message: 'โปรดกรอกชื่อผู้ใช้ และรหัสผ่าน'
            });
        }

        const userGetName = await userRepository.getByUsername(username)
        if (!userGetName) {
            return res.status(400).json({
                status: false,
                message: "ไม่พบ username นี้ในระบบ"
            });
        }

        const newPassWord: string = PasswordEncrypt(password)

        if (userGetName.password != newPassWord) {
            return res.status(400).json({
                status: false,
                message: "ไม่สามารถเข้าสู่ระบบได้ในขณะนี้"
            });
        }

        let token: string
        if (!userGetName.token) {
            const fullName = userGetName.name + " " + userGetName.lastname
            token = jwt.sign({username: userGetName.username, realName: fullName}, 'shhhhh');

            await userRepository.updateTokenByUsername(userGetName.id, token)
        } else {
            token = userGetName.token
        }

        return res.status(200).json({
            status: true,
            message: 'เข้าสู่ระบบสำเร็จ',
            token: token
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

