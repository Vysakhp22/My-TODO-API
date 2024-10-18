import { config } from 'dotenv';
import { app } from '@api/server';
import { databaseSetup } from './databaseSetup';
config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const dbFileName = process.env.DB_FILE_NAME || 'TODO.db';

databaseSetup(dbFileName).then(() => {
    console.log('Database setup completed.');
}).catch((error: Error) => {
    console.log(error.message);
});

app.listen(3000, () => {
    console.log(`Server is running at http://${host}:${port}`);
});