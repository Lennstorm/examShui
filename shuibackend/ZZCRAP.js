// AddNote POST
const { sendError, sendResponse } = require("../../responses/index.js");
const { db } = require("../../services/index.js");
const { v4: uuidv4 } = require('uuid'); // Importera uuid för att generera unika ID:n

export const handler = async (event) => {

    try {
        const { method } = event.requestContext.http;

        if (method !== 'POST') {
            return sendError(405, "Method not allowed");
        }

        // hämta ny note från request body
        const newNote = JSON.parse(event.body);

        // Validera att nödvändiga fält finns.
        if (!newNote.note || typeof newNote.done !== 'boolean') {
            return sendError(400, 'Invalid input: "note" and "done" fields required!');
        }

        // Generera ett nytt UUID
        const newId = uuidv4();

        const addedNote = {
            id: newId, // Använd UUID som id
            note: newNote.note,
            done: newNote.done
        };

        // Lägga till i DynamoDB
        await db.put({
            TableName: "todo-table-db",
            Item: addedNote
        });

        return sendResponse(200, addedNote);

    } catch (error) {
        return sendError(500, { message: 'Internal server error!', error: error.message });
    }
};
