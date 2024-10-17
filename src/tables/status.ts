import { db } from "@api/connect";

export const createStatusTable = (): Promise<string | Error> => {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE IF NOT EXISTS status (
        name TEXT PRIMARY KEY
    )`, (err: Error | null) => {
            if (err) {
                reject(new Error(err.message || 'Failed to create the status table.'));
                return;
            }
            console.log('Created the status table.');
        });

        db.get('SELECT count(*) as count FROM status', (err: Error | null, row: { count: number }) => {
            if (err) {
                reject(new Error(err.message || 'Failed to count the records in the status table.'));
                return;
            }
            if (row.count === 0) {
                db.run(`INSERT INTO status (name) VALUES ('Pending'), ('In Progress'), ('Completed')`, (err: Error | null) => {
                    if (err) {
                        reject(new Error(err.message || 'Failed to insert into the status table.'));
                        return;
                    }
                    console.log('Inserted into the status table.');
                    resolve('Created the status table.');
                });
            } else {
                resolve('Created the status table.');
            }
        });
    })
};

