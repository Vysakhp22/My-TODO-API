import { Database } from "sqlite3";

const createTable = (db: Database): Promise<string> => {
    return new Promise((resolve, reject) => {
        const command = `CREATE TABLE IF NOT EXISTS task (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT,
            priority TEXT,
            due_date DATETIME,
            user_id TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            deleted_at DATETIME,
            FOREIGN KEY (status) REFERENCES status (name),
            FOREIGN KEY (priority) REFERENCES priority (name),
            FOREIGN KEY (user_id) REFERENCES user (id)
        );`;
        db.run(command, [], (err: Error) => {
            if (err) {
                reject(new Error(err.message || 'Failed to create the task table.'));
                return;
            }
            resolve('Created the task table.');
        });
    });
};

export const createTasksTable = async (db: Database): Promise<string> => {
    try {
        const database = await createTable(db);
        return Promise.resolve(database);
    } catch (err) {
        throw err;
    }
}