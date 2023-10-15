import express, { Request, Response } from 'express';
import path from 'path';
import tasksRouter from './routers/tasksRouter';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(tasksRouter);
app.use(errorHandlerMiddleware);

app.all('*', (req: Request, res: Response) => {
    res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}/`);
});
