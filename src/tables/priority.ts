import { db } from "@api/connect";

export const createPriorityTable = (): Promise<Error | string> => {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE IF NOT EXISTS priority (
        name TEXT PRIMARY KEY
    )`, (err) => {
            if (err) {
                reject(new Error(err.message || 'Failed to create the priority table.'));
                return;
            }
            console.log('Created the priority table.');
        });

        db.get('SELECT count(*) as count FROM priority', (err, row: { count: number }) => {
            if (err) {
                reject(new Error(err.message || 'Failed to count the records in the priority table.'));
                return;
            }
            if (row.count === 0) {
                db.run(`INSERT INTO priority (name) VALUES ('Low'), ('Medium'), ('High')`, (err: Error) => {
                    if (err) {
                        reject(new Error(err.message || 'Failed to insert into the priority table.'));
                        return;
                    }
                    console.log('Inserted into the priority table.');
                    resolve('Created the priority table.');
                });
            } else {
                resolve('Created the priority table.');
            }
        });

    })
}