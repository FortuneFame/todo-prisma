import { PrismaClient, Task } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = 1;
        const user = await prisma.user.findFirstOrThrow({
            where: { id: userId },
        });

        const tasks = await prisma.task.findMany({
            where: {
                project: {
                    user: user,
                },
            },
            include: {
                project: { include: { user: true } },
            },
        });

        res.status(200).json({ tasks: tasks });
    } catch (err) {
        next(err);
    }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const task = await prisma.task.findUnique({ where: { id: parseInt(id, 10) } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ task });
    } catch (err) {
        next(err);
    }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name_tasks } = req.body as Task;
        const task = await prisma.task.create({
            data: {
                name_tasks: name_tasks ,
                projectId:1,
            }
        });
        res.status(201).json({ task });
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name_tasks, completed } = req.body;
        const task = await prisma.task.update({
            where: { id: parseInt(id, 10) },
            data: { name_tasks, completed }
        });
        res.status(200).json({ task });
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await prisma.task.delete({
            where: { id: parseInt(id, 10) }
        });
        res.status(200).json({ message: 'Task deleted successfully!' });
    } catch (err) {
        next(err);
    }
};
