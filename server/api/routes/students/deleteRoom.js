import { Router } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../modules/AdminDBConnection.js";

const deleteStudentRoom = Router();

// to delete a student in a specific room
setJSONPacketFormat({error: '', deleted: false});
deleteStudentRoom.delete('/:slot/:username', getRequestPermission, (req, res) => {
    const responseFormat = { deleted: [], error: '' };
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);

    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.deleted = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        console.log(error);

        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.deleteStudentRoom(req.params.slot, req.params.username);
});

export default deleteStudentRoom;

