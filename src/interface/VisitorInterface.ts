export interface VisitorInterface {
    id: number;
    pin_code: string;
    qr_key: string;
    visitor_name: string;
    location: string;
    contact_about: string;
    mobile_phone: string;
    email: string;
    car_registration: string;
    create_time: string;
    entry_time: string;
    exit_time: string;
    approve: Boolean;
}