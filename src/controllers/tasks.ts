import { Request, Response } from "express";
import { Database } from "sqlite3";

export const getAllTasks = async (req: Request, res: Response, db: Database) => {
    const userId = req.params.userId;
    const command = `SELECT * FROM task WHERE userId = ?`;
    db.all(command, [userId], (err: Error, rows: any) => {
        if (err) {
            res.status(500).json({ message: err.message || 'Failed to get the tasks.' });
            return;
        }
        res.status(200).json(rows);
    });
};

export const getTaskById = async (req: Request, res: Response, db: Database) => {
    const id = req.params.id;
    const command = `SELECT * FROM task WHERE id = ?`;
    db.get(command, [id], (err: Error, row: any) => {
        if (err) {
            res.status(500).json({ message: err.message || 'Failed to get the task.' });
            return;
        }
        res.status(200).json(row);
    });
};

export const createTask = async (req: Request, res: Response, db: Database) => {
    const { title, description, status, priority, dueDate, userId } = req.body;
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const command = `INSERT INTO task (title, description, status, priority, due_date, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(command, [title, description, status, priority, dueDate, userId, createdAt, updatedAt], (err: Error) => {
        if (err) {
            res.status(500).json({ message: err.message || 'Failed to create the task.' });
            return;
        }
        res.status(201).json({ message: 'Task created.' });
    });
};

export const updateTask = async (req: Request, res: Response, db: Database) => {
    const { id, title, description, status, priority, due_date, deleted_at } = req.body;
    const updated_at = new Date().toISOString();
    const command = `UPDATE task SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, updated_at = ?, deleted_at = ? WHERE id = ?`;
    db.run(command, [title, description, status, priority, due_date, updated_at, deleted_at, id], (err: Error) => {
        if (err) {
            res.status(500).json({ message: err.message || 'Failed to update the task.' });
            return;
        }
        res.status(200).json({ message: 'Task updated.' });
    });
};

export const deleteTask = async (req: Request, res: Response, db: Database) => {
    const id = req.params.id;
    const deleted_at = new Date().toISOString();
    const command = `UPDATE task SET deleted_at = ? WHERE id = ?`;
    db.run(command, [deleted_at, id], (err: Error) => {
        if (err) {
            res.status(500).json({ message: err.message || 'Failed to delete the task.' });
            return;
        }
        res.status(200).json({ message: 'Task deleted.' });
    });
};