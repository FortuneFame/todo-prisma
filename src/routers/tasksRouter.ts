import express from 'express';
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/tasksController';
import {
    validateTaskIdMiddleware,
    validateTaskNameMiddleware,
    validateTaskUpdateMiddleware
} from '../middleware';

const tasksRouter = express.Router();

tasksRouter.use('/api/v1/tasks/:id', validateTaskIdMiddleware);

tasksRouter.get('/api/v1/tasks', getAllTasks);
tasksRouter.get('/api/v1/tasks/:id', getTaskById);
tasksRouter.post('/api/v1/tasks', validateTaskNameMiddleware, createTask);
tasksRouter.patch('/api/v1/tasks/:id', validateTaskUpdateMiddleware, updateTask);
tasksRouter.delete('/api/v1/tasks/:id', deleteTask);

export default tasksRouter;
