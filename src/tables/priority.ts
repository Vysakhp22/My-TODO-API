import { Database } from "sqlite3";

const createTable = (db: Database): Promise<string> => {
    return new Promise((resolve, reject) => {
        const command = `CREATE TABLE IF NOT EXISTS priority (name TEXT PRIMARY KEY);`;
        db.run(command, [], (err: Error) => {
            if (err) {
                reject(new Error(err.message || 'Failed to create the priority table.'));
                return;
            }
            resolve('Created the priority table.');
        });
    });
};

const countRecords = (db: Database): Promise<number> => {
    return new Promise((resolve, reject) => {
        const command = `SELECT count(*) as count FROM priority`;
        db.get(command, [], (err, row: { count: number }) => {
            if (err) {
                reject(new Error(err.message || 'Failed to count the records in the priority table.'));
                return;
            }
            resolve(row.count);
        });
    });
};

const insertRecords = (db: Database, values: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const command = `INSERT INTO priority (name) VALUES (?)`;
        db.run(command, [values], (err) => {
            if (err) {
                reject(new Error(err.message || 'Failed to populate the priority table.'));
                return;
            }
            resolve('Priority table populated successfully.');
        });
    });
};

const populateTable = async (db: Database): Promise<string> => {
    const values = ['Low', 'Medium', 'High'];
    await Promise.all(values.map((value) => insertRecords(db, value)));
    return Promise.resolve('Priority table populated successfully.');
};

export const createPriorityTable = async (db: Database): Promise<[string, string]> => {
    try {
        const database = await createTable(db);
        const rows = await countRecords(db);
        let populateResult = '';
        if (rows === 0) {
            populateResult = await populateTable(db);
        } else {
            populateResult = 'Priority table already populated.';
        }
        return [database, populateResult];
    } catch (err) {
        throw err;
    }
};
