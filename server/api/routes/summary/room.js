import { Router } from "express";
import { setJSONPacketFormat, getRequestPermission } from "../../../middleware/tokenValidator";
import { AdminMongoDBConnection } from "../../../modules/AdminDBConnection";

const roomSummary = Router();
setJSONPacketFormat({error: '', roomSummary: {}});

roomSummary.get('/:roomID', getRequestPermission, (req, res) => {
    const responseFormat = {error: '', roomSummary: {}};
    const DBConnection = new AdminMongoDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(roomsummary => {
        responseFormat.roomSummary = roomSummary;
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.roomSummary(req.params.roomID);
});

export default roomSummary;