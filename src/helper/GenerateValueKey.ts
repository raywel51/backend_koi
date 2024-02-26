import * as randomstring from "randomstring";

export const generatePinCode = (): string => {
    return randomstring.generate({
        length: 6,
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567'
    });
}

export const generateQrKey = (): string => {
    return randomstring.generate({
        length: 10,
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567'
    });
}