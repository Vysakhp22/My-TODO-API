import { config } from 'dotenv';
import { app } from '@api/server';
import { connectToDatabase } from './connect';
import { Database } from 'sqlite3';
// import * as fs from 'fs';
import { createPriorityTable } from './tables/priority';
import { createStatusTable } from './tables/status';
import { createTasksTable } from './tables/tasks';
config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const dbFileName = process.env.DB_FILE_NAME || 'TODO.db';

// if (!fs.existsSync(dbFileName)) {
connectToDatabase(dbFileName).then(async (response: Database) => {
    if (response) {
        await createPriorityTable(response).then((response: string[]) => {
            console.log(response);
        }).catch((error: Error) => {
            console.log(error.message);
        });

        await createStatusTable(response).then((response: string[]) => {
            console.log(response);
        }).catch((error: Error) => {
            console.log(error.message);
        });

        await createTasksTable(response).then((response: string | Error) => {
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