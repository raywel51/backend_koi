import e, {Request, Response} from "express";
import {PasswordEncrypt} from "../../../helper/PasswordEncrypt";
import {VisitorLogEntity} from "../../../entity/VisitorLogEntity";
import {UserEntity} from "../../../entity/UserEntity";
import {UserRepository} from "../../../repository/UserRepository";

export const UserRegisterController = async (req: Request, res: Response): Promise<e.Response> => {
    try {
        const userRepository = UserRepository.getInstance()

        const { username, password, name, lastname, phone, email } = req.body

        if (!username) {
            return res.status(400).json({
                status: false,
                message: 'no Username'
            });
        }

        if (!password) {
            return res.status(400).json({
                status: false,
                message: 'no Password'
            });
        }

        const newPassWord = PasswordEncrypt(password)

        const userGetName = await userRepository.getByUsername(username)
        if (userGetName) {
            return res.status(400).json({
                status: false,
                message: "this username is register"
            });
        }

        const userEntity: any = Object.assign(new UserEntity(), {
            username : username,
            password : newPassWord,
            name : name,
            lastname : lastname,
            phone : phone,
            email : email
        })

        await userRepository.create(userEntity)

        return res.status(200).json({
            status: true,
            message: 'User Register Successfully'
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