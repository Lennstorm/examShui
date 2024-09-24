// GetAllNotes
const { sendError, sendResponse } = require("../../responses/index.js");
const { db } = require("../../services/index.js");

// Hämta alla notes
exports.handler = async (event) => {
    try {
        const { Items } = await db.scan({
            TableName: "shuinotes-table-db",
        });

        if (!Items || Items.length < 1) {
            return sendError(404, "No notes found");
        } 
            return sendResponse(200, Items);
        
    } catch (error) {
        return sendError(500, { message: error.message });
    }
};