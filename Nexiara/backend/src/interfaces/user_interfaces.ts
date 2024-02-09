export interface ICreateUser {
    name: string;
    email: string;
    phoneNo: number;
    password: string;
    isEmailVerified: boolean;
}

export interface ICreateUserResponse {
    _id: string;
    name: string;
    email: string;
    phoneNo: number;
    isEmailVerified: boolean;
}

export interface IGetUsers {
    _id: string;
    name: string;
    email: string;
    phoneNo: number;
    isEmailVerified: boolean;
}

export interface IValidateUsers {
    _id: string;
    email: string;
    phoneNo: number;
    password: string,
    isEmailVerified: boolean;
}

export interface IUpdateUser {
    name?: string;
    email?: string;
    phoneNo?: number;
    password?: string;
    otp?: number;
    isEmailVerified?: boolean;
}

export interface IUpdatePassword {
    password: string;
}