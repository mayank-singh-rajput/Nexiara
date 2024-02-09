import { Express } from 'express';
import UserService from '../services/user';
import UserMiddleware from '../middlewares/user';
import { checkToken, validateToken } from './middlewares/token';

export default (app: Express) => {
    const userService = new UserService();
    const userMiddleware = new UserMiddleware();

    // google  authentication
    app.post('/user/google', userMiddleware.googleLogin, userService.googleLogin);

    // create user
    app.post('/user/create', userMiddleware.createUser, userService.createUser);

    // send otp
    app.put('/user/send-otp', checkToken, userMiddleware.SendOtp, userService.SendOtp);

    // verify otp
    app.put('/user/verify-otp', checkToken, userMiddleware.verifyOtp, userService.verifyOtp);

    // login user
    app.post('/user/login', userMiddleware.loginUser, userService.loginUser);

    //logout user
    app.post('/user/logout', checkToken, userService.logoutUser);

    //update user
    app.put('/user/update', checkToken, userMiddleware.updateUser, userService.updateUser);

    //delete user
    app.delete('/user/delete', checkToken, userService.deleteUser);

    // get user by id
    app.get('/user/getById', checkToken, userService.getUserById);

    // check token
    app.get('/auth/check-token', validateToken);

}
