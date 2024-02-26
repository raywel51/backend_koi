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
            return 'place is required.';
        } else if (!this.contact) {
            return 'contact is required.';
        } else if (!this.mobile_phone) {
            return 'mobile_phone is required.';
        } else if (!this.email) {
            return 'email is required.';
        } else if (!this.plate) {
            return 'plate is required.';
        } else if (!this.start_time) {
            return 'start_time is required.';
        } else if (!this.final_time) {
            return 'final_time is required.';
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