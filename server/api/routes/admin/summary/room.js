import { Router } from "express";
import { setJSONPacketFormat, getRequestPermission } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";

const roomSummary = Router();
setJSONPacketFormat({error: '', roomSummary: {}});

roomSummary.get('/room/:roomID', getRequestPermission, (req, res) => {
    const responseFormat = {error: '', roomSummary: {}};
    const DBConnection = new AdminMongoDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(roomsummary => {
        responseFormat.roomSummary = roomsummary;
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        console.log(error);
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.roomSummary(req.params.roomID);
});

export default roomSummary;