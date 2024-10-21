import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "@api/controllers/tasks";
import { Router } from "express";
import { Database } from "sqlite3";


const dbFileName = process.env.DB_FILE_NAME || 'TODO.db';
const router: Router = Router();
const db: Database = new Database(dbFileName);

router.get('/tasks', async (req, res) => {
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

router.get('/getTasks', async (req, res) => {
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

router.post('/createTask', async (req, res) => {
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

router.put('/updateTask', async (req, res) => {
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

router.delete('/deleteTask', async (req, res) => {
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

