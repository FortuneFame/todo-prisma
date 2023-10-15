import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const { name_tasks } = req.body;
    if (!name_tasks || typeof name_tasks !== 'string') {
        return res.status(400).json({ error: 'Name task is required and should be a string' });
    }
    next();
};
