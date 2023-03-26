import { Router } from 'express';
import { setJSONPacketFormat, getRequestPermission } from '../../../middleware/tokenValidator.js';
import { AdminMongoDBConnection } from '../../../modules/AdminDBConnection.js';

const roomUsers = Router();

setJSONPacketFormat({'users': [], 'error': ''});
roomUsers.get('/users/:roomID', getRequestPermission, (req, res) => {
    const responseFormat = {'users': [], 'error': ''};
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);

    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.users = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.getUsersData(req.params.roomID);
});

export default roomUsers;