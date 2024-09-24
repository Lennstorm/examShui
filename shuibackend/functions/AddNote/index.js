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
        const {username, text }  = JSON.parse(event.body);

        const maxTextLength = 500;

        //Validera att nödvändiga fält finns.
        if (!username || !text || text.length > maxTextLength) {
            return sendError(400, `Invalid input: "username" and "text" fields are required, and "text" must not exceed ${ maxTextLength } tekken`);
        }

        const newId = uuidv4();

        const now = new Date();
        const timeZoneOffset = 2 * 60 * 60 * 1000; //Justering av tidszon, latmansversion
        const localTime = new Date(now.getTime() + timeZoneOffset);

        const createdAt = localTime.toISOString().slice(0, 16).replace('T', ' ');
                
        const addedNote = {
            id: newId,
            username: username,
            text: text,
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