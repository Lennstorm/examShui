// DeleteNote
const { sendError, sendResponse } = require("../../responses/index.js");
const { db } = require("../../services/index.js");

exports.handler = async (event) => {
    try {
        const { id } = event.pathParameters;
        const { Item } = await db.get({
            TableName: "shuinotes-table-db",
            Key: {
                id: id
            }
        });
        
        if (!Item) {
            return sendError(404, "No such note!");
        }
        
        await db.delete({
            TableName: "shuinotes-table-db",
            Key: {                
                id: id
            }
        });
        return sendResponse(200, {message: `Note with id ${id} successfully deleted` });

    } catch (error) {
        return sendError(500, { message: error.message });
    }
};