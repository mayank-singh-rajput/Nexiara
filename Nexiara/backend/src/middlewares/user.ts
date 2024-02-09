import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { FormatError } from '../utils/parser';

class UserMiddleware {
    // create user middleware
    async googleLogin(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { tokenId } = req.body;            

            if (!tokenId) {
                throw new Error('Token is required');
            }
           

            req.body = {
                tokenId,
                isEmailVerified: true
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // create user middleware
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { firstname, lastname, phoneNo, password, email } = req.body; 
            const name = firstname + ' ' + lastname;           

            if (!name) {
                throw new Error('name is required');
            }
            if (!password) {
                throw new Error('password is required');
            }
            if (!email) {
                throw new Error('email is required');
            }
            // check password using regex
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            if (!passwordRegex.test(password)) {
                throw new Error('password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
            }

            // check email using regex
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
                throw new Error('email is invalid');
            }

            req.body = {
                name: name || '',
                password,
                email: email.toLowerCase(),
                phoneNo,
                isEmailVerified: false,
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // login user middleware
    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { email, password } = req.body;

            if (!email) {
                throw new Error('email is required');
            }
            if (!password) {
                throw new Error('password is required');
            }

            // check email using regex
            if (email) {
                const emailRegex = /\S+@\S+\.\S+/;
                if (!emailRegex.test(email)) {
                    throw new Error('Email is invalid');
                }
            }

            req.body = {
                email: email.toLowerCase(),
                password,
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // send otp
    async SendOtp(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { email } = req.user;
            if (!email) {
                throw new Error('email is required');
            }

            req.body = {
                email: email.toLowerCase(),
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // verify otp
    async verifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { email } = req.user;
            const { otp } = req.body;
            if (!email) {
                throw new Error('email is required');
            }
            if (!otp) {
                throw new Error('otp is required');
            }

            req.body = {
                email: email.toLowerCase(),
                otp: parseInt(otp)
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    //update user middleware
    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { firstname, lastname, phoneNo, password, email } = req.body; 
            const name = firstname + ' ' + lastname;           

            if (!name && !password && !email && !phoneNo) {
                throw new Error('At least one field is required for the update');
            }

            // check password using regex
            if (password) {
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
                if (!passwordRegex.test(password)) {
                    throw new Error('password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
                }
            }

            // check email using regex
            if (email) {
                const emailRegex = /\S+@\S+\.\S+/;
                if (!emailRegex.test(email)) {
                    throw new Error('email is invalid');
                }
            }

            req.body = {
                name: name || '',
                password: password || '',
                email: email || '',
                phoneNo: phoneNo || 0,
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // get user by name middleware
    async getUserByName(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { name } = req.body;
            if (!name) {
                throw new Error('name is required');
            }

            req.body = {
                name,
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // get user by email middleware
    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { email } = req.body;
            if (!email) {
                throw new Error('email is required');
            }

            // check email using regex
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
                throw new Error('email is invalid');
            }

            req.body = {
                email: email.toLowerCase(),
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }
}

export default UserMiddleware;
