import { User } from '../models/index';
import { ICreateUser, ICreateUserResponse, IGetUsers, IUpdateUser, IUpdatePassword, IValidateUsers } from '../../interfaces/user_interfaces';

class UserRepository {
    // create user
    async createUser(data: ICreateUser): Promise<ICreateUserResponse> {
        try {
            const user = await User.create(data);
            return user.toObject() as ICreateUserResponse;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('User creation failed');
        }
    }

    //otp send
    async SendOtp(email: string, otp: number): Promise<any> {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error('No such user found');
            }

            // Corrected update query
            const updateUser = await User.findOneAndUpdate({ email }, { otp: otp }, { new: true });
            if (!updateUser) {
                throw new Error(`User with email ${email} otp not sended`);
            }
            return ({ message: "OTP sended" })
        } catch (err) {
            console.log(`Verification failed for ${email}`, err);
            throw new Error('User Verification otp send failed');
        }
    }

    // verify opt
    async verifyOpt(email: string, otp: number): Promise<IValidateUsers> {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error('No such user found');
            }

            console.log(user.otp, otp);

            if (user && user.otp?.toString() !== otp.toString()) {
                throw new Error('Incorrect OTP code provided');
            }

            // Corrected update query
            const updateUser = await User.findOneAndUpdate({ email }, { isEmailVerified: true }, { new: true });
            if (!updateUser) {
                throw new Error(`User with email ${email} is not verified`);
            }

            return updateUser.toObject() as IValidateUsers
        } catch (err: any) {
            console.log(`Verification failed for ${email}`, err);
            throw new Error(
                err.message || `Verification failed for ${email}`
            );
        }
    }

    // update user by id
    async updateUserById(id: string, data: IUpdateUser): Promise<IGetUsers> {
        try {
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true });

            if (!updateUser) {
                throw new Error(`User with id ${id} not found`);
            }
            return updateUser.toObject() as IGetUsers;

        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('User updation failed');
        }
    }

    // update password
    async updatePassword(email: string, data: IUpdatePassword): Promise<IGetUsers> {
        try {
            const updatePassword = await User.findOneAndUpdate({ email }, data, { new: true });

            if (!updatePassword) {
                throw new Error('User not found');
            }

            return updatePassword.toObject() as IGetUsers;
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('User updation failed');
        }
    }

    // update email
    async updateEmail(_id: string, email: string): Promise<IGetUsers> {
        try {
            const updatePassword = await User.findByIdAndUpdate(_id, { email, isEmailVerified: false, otp: 0 }, { new: true });

            if (!updatePassword) {
                throw new Error('User not found');
            }

            return updatePassword.toObject() as IGetUsers;
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('User updation failed');
        }
    }

    // delete User by id
    async deleteUserById(id: string): Promise<any> {
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('User deletion failed');
        }
    }

    // get User by id
    async getUserById(id: string): Promise<IGetUsers> {
        try {

            const user = await User.findById(id);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return user.toObject() as IGetUsers;
        } catch (error) {
            console.error('Error getting user:', error);
            throw new Error('User not found');
        }
    }

    // get user by name
    async getUserByName(name: string): Promise<IGetUsers> {
        try {
            const user = await User.findOne({ name });
            if (!user) {
                throw new Error(`User with name ${name} not found`);
            }
            return user.toObject() as IGetUsers;
        } catch (error) {
            console.error('Error getting user:', error);
            throw new Error('User not found');
        }
    }

    // get user by email
    async getUserByEmail(email: string): Promise<IValidateUsers> {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error(`User with email ${email} not found`);
            }
            return user.toObject() as IValidateUsers;
        } catch (error) {
            console.error('Error getting user:', error);
            throw new Error('User not found');
        }
    }

    // userCount by email
    async getUserCountByEmail(email: string): Promise<number> {
        try {
            const userCount = await User.countDocuments({ email });
            return userCount;
        } catch (error) {
            console.error('Error getting userCount:', error);
            throw new Error('User count not found');
        }
    }
}

export default UserRepository;