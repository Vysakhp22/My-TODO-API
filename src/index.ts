import { config } from 'dotenv';
import { app } from '@api/server';
config();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.listen(3000, () => {
    console.log(`Server is running at http://${host}:${port}`);
});