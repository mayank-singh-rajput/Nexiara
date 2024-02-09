import { Result } from '../models/index';
import { ICreateResult, IGetResults, IUpdateResult, IDeleteResult } from '../../interfaces/result_interfaces';

class ResultRepository {
    // create Result
    async createResult(data: ICreateResult): Promise<IGetResults> {
        try {
            const result = await Result.create(data);
            return result.toObject() as IGetResults;
        } catch (error) {
            console.error('Error creating Result:', error);
            throw new Error('Result creation failed');
        }
    }

    // update Result by id
    async updateReslutById(id: string, data: IUpdateResult): Promise<IGetResults> {
        try {
            const updateResult = await Result.findByIdAndUpdate(id, data, { new: true });

            if (!updateResult) {
                throw new Error(`Result with id ${id} not found`);
            }
            return updateResult.toObject() as IGetResults;
        } catch (error) {
            console.error('Error updating Result:', error);
            throw new Error('Result updation failed');
        }
    }

    // update Result by id
    async updateOverallResultById(id: string, data: IUpdateResult): Promise<IGetResults> {
        try {
            const updateResult = await Result.findByIdAndUpdate(id, { $push: { overallResult: data } }, { new: true });

            if (!updateResult) {
                throw new Error(`Result with id ${id} not found`);
            }
            return updateResult.toObject() as IGetResults;
        } catch (error) {
            console.error('Error updating Result:', error);
            throw new Error('Result updation failed');
        }
    }

    // get Result by id
    async getResultById(id: string): Promise<IGetResults> {
        try {
            const result = await Result.findById(id).populate('overallResult.QuestionId');
            if (!result) {
                throw new Error(`Result with id ${id} not found`);
            }
            return result.toObject() as IGetResults;
        } catch (error) {
            console.error('Error getting Result:', error);
            throw new Error('Result not found');
        }
    }

    // get Result by userId
    async getResultByUserId(userId: string): Promise<IGetResults> {
        try {
            const result = await Result.findOne({userId: userId}).populate('userId').populate('overallResult.QuestionId').sort({ createdAt: -1 });
            if (!result) {
                throw new Error(`Result with usserid ${userId} not found`);
            }
            return result.toObject() as IGetResults;
        } catch (error) {
            console.error('Error getting Result:', error);
            throw new Error('Result not found');
        }
    }

    // delete result by id
    async deleteResultById(id: string): Promise<any> {
        try {
            const result = await Result.findByIdAndDelete(id);
            if (!result) {
                throw new Error(`Result with id ${id} not found`);
            }
            return true;
        } catch (error) {
            console.error('Error deleting result:', error);
            throw new Error('Result deletion failed');
        }
    }
}

export default ResultRepository;