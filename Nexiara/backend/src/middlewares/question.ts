import { Request, Response, NextFunction } from 'express';
import { FormatError } from '../utils/parser';

interface IOptions {
    value: string;
    point: number;
  }

class QuestionMiddleware {
    // create Question middleware
    async createQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            // check if these fields are present in req.body
            const { Question, options }: { Question: string; options: IOptions[] } = req.body;

            if (!Question) {
                throw new Error('Question is required');
            }
           

            req.body = {
                Question,
                options
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // update Question middleware
    async updateQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const { Question, options }: { Question: string; options: IOptions[] } = req.body;

            if (!Question) {
                throw new Error('Question is required');
            }
           

            req.body = {
                Question,
                options
            };
            next();
        } catch (error: any) {
            const response_data = FormatError(error);
            return res.status(400).json(response_data);
        }
    }

    // Get Question middleware
    async getQuestionById(req: Request, res: Response, next: NextFunction) {
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

    // Get Question middleware
    async deleteQuestionById(req: Request, res: Response, next: NextFunction) {
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

export default QuestionMiddleware;
