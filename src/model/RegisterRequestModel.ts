export class RegisterRequestModel {
    visitor_name: string;
    place: string;
    contact: string;
    mobile_phone: string;
    email: string;
    plate: string;
    start_time: Date;
    final_time: Date;

    constructor(data: RegisterData) {
        this.visitor_name = data.visitor_name;
        this.place = data.place;
        this.contact = data.contact;
        this.mobile_phone = data.mobile_phone;
        this.email = data.email;
        this.plate = data.plate;
        this.start_time = data.start_time;
        this.final_time = data.final_time;
    }

    validate(): string | undefined {
        if (!this.visitor_name) {
            return 'Visitor name is required.';
        } else if (!this.place) {
            return 'Visitor name is required.';
        }
        return undefined;
    }
}

export interface RegisterData {
    visitor_name: string;
    place: string;
    contact: string;
    mobile_phone: string;
    email: string;
    plate: string;
    start_time: Date;
    final_time: Date;
}