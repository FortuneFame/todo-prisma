import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(404).json({ error: 'Task ID must be a number' });
    }
    req.params.id = id.toString();
    next();
};
