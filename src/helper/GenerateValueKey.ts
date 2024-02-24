import * as randomstring from "randomstring";

export const generatePinCode = (): string => {
    const randomNum = Math.floor(Math.random() * 10000);
    return randomNum.toString().padStart(4, '0');
}

export const generateQrKey = (): string => {
    return randomstring.generate({
        length: 10,
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567'
    });
}