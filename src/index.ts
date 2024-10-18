import { config } from 'dotenv';
import { app } from '@api/server';
import { connectToDatabase } from './connect';
import { Database } from 'sqlite3';
// import * as fs from 'fs';
import { createPriorityTable } from './tables/priority';
config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const dbFileName = process.env.DB_FILE_NAME || 'TODO.db';

// if (!fs.existsSync(dbFileName)) {
    connectToDatabase(dbFileName).then((response: Database) => {
        if (response) {
            console.log('Database created successfully.');
            createPriorityTable(response).then((response: string[]) => {
                console.log(response);
            }).catch((error: Error) => {
                console.log(error.message);
            });
        }
    }).catch((error: Error) => {
        console.log(error.message);
    });
// }

app.listen(3000, () => {
    console.log(`Server is running at http://${host}:${port}`);
});