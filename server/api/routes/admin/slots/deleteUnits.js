import { Router } from 'express';
import { setJSONPacketFormat, getRequestPermission } from '../../../../middleware/tokenValidator.js';
import { AdminMongoDBConnection } from '../../../../modules/AdminDBConnection.js';

const deleteUnits = Router();
setJSONPacketFormat({'deleted': false, 'error': ''});

deleteUnits.delete('/:roomID', getRequestPermission, (req, res) => {
    const responseFormat = {deleted: false, 'error': ''};

    // otherwise, get all the slots
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);
    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.deleted = true;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.deleteRoom(req.params.roomID);
});

export default deleteUnits;