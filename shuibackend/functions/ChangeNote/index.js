// ChangeNote
const { sendError, sendResponse } = require("../../responses/index.js");
const { db } = require("../../services/index.js");

exports.handler = async (event) => {
    try {
        const { id } = event.pathParameters;
        
        // Kontrollera om note-id finns
        const { Item } = await db.get({
            TableName: "shuinotes-table-db",
            Key: {
                id: id
            }
        });

        if (!Item) {
            return sendError(404, "Note not found");
        }

        // Hämta nya värden från request body
        const { text } = JSON.parse(event.body);

        const maxTextLength = 500;
        if (!text) {
            return sendError(400, `Invalid input: "text" field is required.`)
        } else if (text.length > maxTextLength) {
            return sendError(400, `Text length must not exceed ${maxTextLength} characters.`);
        }        

        const now = new Date();
        const timeZoneOffset = 2 * 60 * 60 * 1000;
        const localTime = new Date(now.getTime() + timeZoneOffset);
        const editedAt = localTime.toISOString().slice(0, 16).replace('T', ' ');

        const updatedText = `${text}\n\n--Edited at: ${editedAt}`;

        //uppdatera posten i DynamoDB
        await db.update({
            TableName: "shuinotes-table-db",
            Key: {
                id: id
            },
            UpdateExpression: "set #t = :t", //uppdatera endast textfält
            ExpressionAttributeNames: {
                "#t": "text"
            },
            ExpressionAttributeValues: {
                ":t": updatedText
            }
        });
        
        
        return sendResponse(200, {message: "Success! Note updated", id, text});

    } catch (error) {
        return sendError(500, { message: 'Internal server error!', error: error.message });
    }
};
