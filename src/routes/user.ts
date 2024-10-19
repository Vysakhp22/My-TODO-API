import { userLogin, userSignup } from "@api/controllers/user";
import { Router } from "express";
import { Database } from "sqlite3";

const dbFileName = process.env.DB_FILE_NAME || 'TODO.db';
const router = Router();
const db = new Database(dbFileName);

router.post('/signup', async (req, res) => {
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

router.post('/login', async (req, res) => {
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
