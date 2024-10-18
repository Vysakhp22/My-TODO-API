import { Database } from "sqlite3";

const createTable = (db: Database): Promise<string> => {
    return new Promise((resolve, reject) => {
        const command = `CREATE TABLE IF NOT EXISTS status (name TEXT PRIMARY KEY);`;
        db.run(command, [], (err: Error) => {
            if (err) {
                reject(new Error(err.message || 'Failed to create the status table.'));
                return;
            }
            resolve('Created the status table.');
        });
    });
};

const countRecords = (db: Database): Promise<number> => {
    return new Promise((resolve, reject) => {
        const command = `SELECT count(*) as count FROM status`;
        db.get(command, [], (err, row: { count: number }) => {
            if (err) {
                reject(new Error(err.message || 'Failed to count the records in the status table.'));
                return;
            }
            resolve(row.count);
        });
    });
};

const insertRecords = (db: Database, values: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const command = `INSERT INTO status (name) VALUES (?)`;
        db.run(command, [values], (err) => {
            if (err) {
                reject(new Error(err.message || 'Failed to populate the status table.'));
                return;
            }
            resolve('Status table populated successfully.');
        });
    });
};

const populateTable = async (db: Database): Promise<string> => {
    const values = ['Pending', 'In Progress', 'Completed'];
    await Promise.all(values.map((value) => insertRecords(db, value)));
    return Promise.resolve('Status table populated successfully.');
};

export const createStatusTable = async (db: Database): Promise<[string, string]> => {
    try {
        const database = await createTable(db);
        const rows = await countRecords(db);
        let populateResult = '';
        if (rows === 0) {
            populateResult = await populateTable(db);
        } else {
            populateResult = 'Status table already populated.';
        }
        return [database, populateResult];
    } catch (err) {
        throw err;
    }
};

