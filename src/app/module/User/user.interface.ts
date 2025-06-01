export interface IUser {
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    password: string;
    passportNumber: string;
    phoneNumber: string;
    homePhoneNumber: string;
    code: string;
}

