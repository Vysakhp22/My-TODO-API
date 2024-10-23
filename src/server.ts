import express, { NextFunction, Request, Response } from 'express';
import { taskRouter } from './routes/tasks';
import { userRouter } from './routes/user';


// Create an express application
export const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Custom Middleware for CORS
app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.status(200).json({});
        return;
    }
    next();
});

// app.get('/', (_, res: Response) => {
//     res.send('Hello World');
// });
app.use('/user', userRouter);
app.use('/todo', taskRouter);


app.use((_: Request, res: Response, next: NextFunction) => {
    // Only create error if no other route handled the request
    if (!res.headersSent) {
        const error: any = new Error('Not found');
        error.status = 404;
        next(error);
    }
});

// Error handling middleware
app.use((error: any, _: Request, res: Response, __: NextFunction) => {
    res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error'
    });
});