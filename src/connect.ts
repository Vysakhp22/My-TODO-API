import { Database, sqlite3, verbose } from "sqlite3";

const sqlite3: sqlite3 = verbose();

export const db: Database = new sqlite3.Database('TODO.db', sqlite3.OPEN_READWRITE, (err: Error | null) => {
    return new Promise((resolve, reject) => {
        if (err) {
            return reject(err || 'Failed to connect to the database.');
        }
        console.log('Connected to the TODO database.');
        resolve('Connected to the TODO database.');
    });
});