import { connectToDatabase } from "@api/connect";
import { createPriorityTable } from "@api/tables/priority";
import { createStatusTable } from "@api/tables/status";
import { createTasksTable } from "@api/tables/tasks";

export const databaseSetup = async (dbFileName: string): Promise<void> => {
    try {
        const db = await connectToDatabase(dbFileName);
        if (db) {
            await Promise.all([
                createPriorityTable(db),
                createStatusTable(db),
                createTasksTable(db)
            ]);
        }
    } catch (err) {
        throw err;
    }

}