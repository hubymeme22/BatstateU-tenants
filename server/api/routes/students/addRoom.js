import { Router } from "express";
import { postRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../modules/AdminDBConnection.js";
import paramChecker from "../../../modules/paramchecker.js";

const addStudentRoom = Router();

setJSONPacketFormat({added: false, error: ''});
addStudentRoom.post('/room', postRequestPermission, (req, res) => {
    const missedParams = paramChecker(['room_id', 'username'], req.body);
    const responseFormat = {added: false, error: ''};

    if (missedParams.length > 0) {
        responseFormat.error = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }

    const adminDatabase = new AdminMongoDBConnection(req.allowedData);
    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.added = true;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error.toString();
        res.json(responseFormat);
    });

    adminDatabase.addStudentRoom(req.body.room_id, req.body.username);
});

export default addStudentRoom;