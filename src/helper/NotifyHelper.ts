import dotenv from "dotenv";
import axios from 'axios';
import qs from "qs";
import {VisitorLogEntity} from "../entity/VisitorLogEntity";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
export const NotifyHelper = async (visitorLogEntity: VisitorLogEntity, qrKey: string): Promise<void> => {

    const link = process.env.HOST_NAME+ '/view/approve/' + qrKey

    let data = qs.stringify({
        'message': 'รายละเอียดการนัดหมาย\n' +
            'คุณ : '+ visitorLogEntity.visitor_name +'\n' +
            'ติดต่อเรื่อง : '+ visitorLogEntity.contact_about +'\n' +
            'สถานที่ : '+ visitorLogEntity.location +'\n\n' +
            'รายละเอียดเพิ่มเติม\n' +
            'เบอร์โทรศัพท์ : '+ visitorLogEntity.mobile_phone +'\n' +
            'ป้ายทะเบียนรถ : '+ visitorLogEntity.car_registration +'\n' +
            'วันที่ : '+ formatDate(visitorLogEntity.entry_time) +'\n' +
            'จนถึง : '+ formatDate(visitorLogEntity.exit_time) +'\n' +
            link
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://notify-api.line.me/api/notify',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer Xv5CRVXowtr4wi7IK8hoKb4U75xw0iKgAXk6eiEC2Sk'
        },
        data : data
    };

    return await axios(config)
        .then(function (response: { data: any; }) {
            return response.data;
        })
        .catch(function (error: any) {
            console.log(error);
        });

    function formatDate(timestamp: Date): string {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
};