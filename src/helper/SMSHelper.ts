import dotenv from "dotenv";
import axios from 'axios';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
export const testSentSMS = async (phone: string, qrKey: string): Promise<void> => {

    const message = "เปิดลิงค์ เพื่อเปิด QR Code สำหรับการใช้งาน \n" + process.env.HOST_NAME+ '/view/' + qrKey
    console.log(message)

    const data = JSON.stringify({
        "sender": "PONLY SMS",
        "msisdn": [phone],
        "message": message
    });

    const config = {
        method: 'post',
        url: "https://thsms.com/api/send-sms",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + process.env.SMS_TOKEN
        },
        data: data
    };
    return await axios(config)
        .then(function (response: { data: any; }) {
            return response.data;
        })
        .catch(function (error: any) {
            console.log(error);
        });
};