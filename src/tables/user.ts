import { Database } from "sqlite3";

const createTable = (db: Database): Promise<string> => {
    return new Promise((resolve, reject) => {
        const command = `CREATE TABLE IF NOT EXISTS user (
            id TEXT PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );`;
        db.run(command, [], (err: Error) => {
            if (err) {
                reject(new Error(err.message || 'Failed to create the user table.'));
                return;
            }
            resolve('Created the user table.');
        });
    });
}

export const createUserTable = async (db: Database): Promise<string> => {
    try {
        const database = await createTable(db);
        return Promise.resolve(database);
    } catch (err) {
        throw err;
    }
}