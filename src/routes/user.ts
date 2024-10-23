import { getAllUsers, userLogin, userSignup } from "@api/controllers/user";
import { Router } from "express";
import { Database } from "sqlite3";

const dbFileName = process.env.DB_FILE_NAME || 'TODO.db';
const db = new Database(dbFileName);
export const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    try {
        await userSignup(req, res, db)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(500).json({ message: 'Failed to signup the user.' });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        await userLogin(req, res, db)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(500).json({ message: 'Failed to login the user.' });
    }
});

userRouter.get('/allUsers', async (req, res) => {
    try {
        await getAllUsers(req, res, db)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(500).json({ message: 'Failed to get the users.' });
    }
});
