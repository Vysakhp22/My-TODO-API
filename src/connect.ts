import { Database, sqlite3, verbose } from "sqlite3";

const sqlite3: sqlite3 = verbose();

export const connectToDatabase = (dbName: string): Promise<Database> => {
    return new Promise((resolve, reject) => {
        const db: Database = new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, (err: Error | null) => {
            if (err) {
                reject(new Error(err.message || 'Failed to connect to the database.'));
                return;
            }
        });
        console.log('Connected to the TODO database.');
        resolve(db);
    });
}