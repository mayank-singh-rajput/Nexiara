import { Request, Response, NextFunction } from 'express';
import { FormatError } from '../utils/parser';

interface IQuestion {
    QuestionId: string;
    ChoosedOption: string;
}

class ResultMiddleware {
    // create Result middleware
    async createResult(req: Request, res: Response, next: NextFunction) {
        try {            
            const { _id: userId } = req.user
            // check if these fields are present in req.body
            const { Questions }: { Questions: IQuestion[] } = req.body;

            if (!Questions) {
                throw new Error('Questions is required');
            }
           

            req.body = {
                Questions,
                userId
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // update Result middleware
    async updateResult(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id: userId } = req.user
            // check if these fields are present in req.body
            const { Questions }: { Questions: IQuestion[] } = req.body;

            if (!Questions) {
                throw new Error('Questions is required');
            }

            req.body = {
                Questions,
                userId
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // Get Result middleware
    async getResultById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            if (!id) {
                throw new Error('Id is required');
            }

            req.params = {
                id
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // Get Result middleware
    async deleteResultById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            if (!id) {
                throw new Error('Id is required');
            }

            req.params = {
                id
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }
}

export default ResultMiddleware;
