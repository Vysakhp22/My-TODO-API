import { Request, Response } from "express";
import { Database } from "sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const checkUserExists = (db: Database, email: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const command = `SELECT * FROM user WHERE email = ?`;
        db.get(command, [email], (err: Error, row: any) => {
            if (err) {
                reject(new Error(err.message || 'Failed to check if the user exists.'));
                return;
            }
            resolve(row);
        });
    });
}


export const userSignup = async (req: Request, res: Response, db: Database) => {
    const { email } = req.body;
    const row = await checkUserExists(db, email);
    if (row) {
        res.status(400).json({ message: 'User already exists.' });
        return;
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.status(500).json({ message: 'Failed to hash the password.' });
                return;
            }
            const command = `INSERT INTO user (id, email, password) VALUES (?, ?, ?)`;
            db.run(command, [crypto.randomUUID(), email, hash], (err: Error) => {
                if (err) {
                    res.status(500).json({ message: err.message || 'Failed to signup the user.' });
                    return;
                }
                res.status(201).json({ message: 'User signed up successfully.' });
            });
        })
    }
}

export const userLogin = async (req: Request, res: Response, db: Database) => {
    const { email } = req.body;
    const row = await checkUserExists(db, email);
    if (!row) {
        res.status(401).json({ message: 'User does not exist.' });
        return;
    } else {
        bcrypt.compare(req.body.password, row.password, (err, result) => {
            if (err) {
                res.status(401).json({ message: 'Authentication failed.' });
                return;
            }
            if (!result) {
                res.status(401).json({ message: 'Invalid password.' });
                return;
            }
            const token = jwt.sign({
                email: row.email,
                id: row.id
            },
                process.env.JWT_SECRET || 'default_secret',
                {
                    expiresIn: '1h'
                });
            res.status(200).json({
                message: 'Authentication successful.',
                token: token
            });
        });
    }
}

export const getAllUsers = (_: Request, res: Response, db: Database): Promise<void> => {
    return new Promise((resolve, _) => {
        const command = `SELECT * FROM user`;
        db.all(command, (err: Error, rows: any) => {
            if (err) {
                res.status(500).json({ message: err.message || 'Failed to get the users.' });
                return resolve();
            }
            res.status(200).json(rows);
            return resolve();
        });
    });
}