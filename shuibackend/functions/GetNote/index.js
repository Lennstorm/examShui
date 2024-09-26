// GetAllNotes
const { sendError, sendResponse } = require("../../responses/index.js");
const { db } = require("../../services/index.js");

exports.handler = async (event) => {
    try {
        const { id } = event.pathParameters;
        const { Item } = await db.get({
            TableName: "shuinotes-table-db",
            Key: { id: id }
        });

        if (!Item) {
            return sendError(404, "Note not found");
        } 
            return sendResponse(200, Item);
        
    } catch (error) {
        return sendError(500, { message: error.message });
    }
};