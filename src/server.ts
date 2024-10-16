import express, { NextFunction, Request, Response } from 'express';

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


app.get('/', (_, res: Response) => {
    res.send('Hello World');
});

app.use((_, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Route not found' });
    next();
});

app.use((err: Error, _: Request, res: Response) => {
    res.status(500).json({ message: err.message });
});