import { db } from "@api/connect";

export const createTable = (): Promise<string | Error> => {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT,
        priority TEXT,
        due_date DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        deleted_at DATETIME,
        FOREIGN KEY (status) REFERENCES status (name),
        FOREIGN KEY (priority) REFERENCES priority (name)
    )`, (err: Error | null) => {
            if (err) {
                reject(new Error(err.message || 'Failed to create the tasks table.'));
                return;
            }
            console.log('Created the tasks table.');
            resolve('Created the tasks table.');
        });
    });
}