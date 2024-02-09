import { Request, Response, NextFunction } from 'express';
const { isTokenExpired } = require('../../utils/encrypt');
import { FormatError, FormatData } from '../../utils/parser'
import { validateSignature } from '../../utils/encrypt';
import UserRepository from '../../database/repository/user';

// varable which extends Request 
declare global {
    namespace Express {
        interface Request {
            user: any;
            admin: any;
        }
    }
}

async function validateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const userRepository = new UserRepository();
        const Token = req.headers.authorization || '';

        if (!Token) {
            const response_data = FormatError({ message: 'No Token Found' });
            return res.status(401).json(response_data);
        }

        const isToken = await isTokenExpired(Token);
        if (isToken) {
            const response_data = FormatError({ message: 'Token is expired' });
            return res.status(401).json(response_data);
        }

        const decodedData = await validateSignature(Token);
        const id = decodedData._id;

        // Get user
        const user = await userRepository.getUserById(id);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        const response_data = FormatData(user);
        return res.status(200).json(response_data);

    }
    catch (err) {
        const response_data = FormatError({ message: 'Error on Token Middleware' });
        return res.status(400).json(response_data);
    }
}

// check user token middleware
async function checkToken(req: Request, res: Response, next: NextFunction) {
    try {
        const userRepository = new UserRepository();
        const Token = req.headers.authorization || '';

        if (!Token) {
            const response_data = FormatError({ message: 'No Token Found' });
            return res.status(401).json(response_data);
        }

        const isToken = await isTokenExpired(Token);
        if (isToken) {
            const response_data = FormatError({ message: 'Token is expired' });
            return res.status(401).json(response_data);
        }

        const decodedData = await validateSignature(Token);
        const id = decodedData._id;

        // Get user
        const user = await userRepository.getUserById(id);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();
    }
    catch (err) {
        const response_data = FormatError({ message: 'Error on Token Middleware' });
        return res.status(400).json(response_data);
    }
}

export { validateToken, checkToken }