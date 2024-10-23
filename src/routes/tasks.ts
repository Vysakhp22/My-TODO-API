import { createTask, deleteTask, getAllTasks, getTaskById, getTasks, updateTask } from "@api/controllers/tasks";
import { Router } from "express";
import { Database } from "sqlite3";


const dbFileName = process.env.DB_FILE_NAME || 'TODO.db';
const db: Database = new Database(dbFileName);
export const taskRouter: Router = Router();

taskRouter.get('/allTasks', async (req, res) => {
    try {
        await getAllTasks(req, res, db)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(500).json({ message: 'Failed to get the tasks.' });
    }
});

taskRouter.get('/tasks', async (req, res) => {
    try {
        await getTasks(req, res, db)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(500).json({ message: 'Failed to get the tasks.' });
    }
});

taskRouter.get('/getTasks', async (req, res) => {
    try {
        await getTaskById(req, res, db)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(500).json({ message: 'Failed to get the task.' });
    }
});

taskRouter.post('/createTask', async (req, res) => {
    try {
        await createTask(req, res, db)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(500).json({ message: 'Failed to create the task.' });
    }
});

taskRouter.put('/updateTask', async (req, res) => {
    try {
        await updateTask(req, res, db)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(500).json({ message: 'Failed to update the task.' });
    }
});

taskRouter.delete('/deleteTask', async (req, res) => {
    try {
        await deleteTask(req, res, db)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(500).json({ message: 'Failed to delete the task.' });
    }
});

