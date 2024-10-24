import { config } from 'dotenv';
config();
import { app } from '@api/server';
import { databaseSetup } from './databaseSetup';

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const dbFileName = process.env.DB_FILE_NAME || 'TODO.db';

async function startServer() {
    try {
        // Set up the database
        await databaseSetup(dbFileName);
        console.log('Database setup completed.');

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running at http://${host}:${port}`);
        });
    } catch (error) {
        console.error('Error during server startup:', error);
        process.exit(1);
    }
}

startServer();