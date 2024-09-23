// AddNote POST
const { sendError, sendResponse } = require("../../responses/index.js");
const { db } = require("../../services/index.js");
const { v4: uuidv4 } = require('uuid'); 

export const handler = async (event) => {

    try {
        const { method } = event.requestContext.http;

        if (method !== 'POST') {
            return sendError(405, "Method not allowed");
        }
        // hämta ny note från request body
        const newNote = JSON.parse(event.body);

        const maxTextLength = 500;

        //Validera att nödvändiga fält finns.
        if (!newNote.username || !newNote.text || newNote.text.length > maxTextLength) {
            return sendError(400, `Invalid input: "note" and "text" fields are required, and "text" must not exceed ${ maxTextLength } tekken`);
        }

        const newId = uuidv4();

        const createdAt = new Date().toISOString().slice(0, 16).replace('T', ' ');
                
        const addedNote = {
            id: newId,
            username: newNote.username,
            text: newNote.text,
            createdAt: createdAt
        };

        // pusha in i dynamoDB
        await db.put({
            TableName: "shuinotes-table-db",
            Item: addedNote
        });

        return sendResponse(200, addedNote);


    } catch (error) {
        return sendError(500, { message: 'Internal server error!', error: error.message })
    }


}