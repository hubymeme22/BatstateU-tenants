import { Router } from 'express';
import { setJSONPacketFormat, getRequestPermission } from '../../../middleware/tokenValidator.js';
import { AdminMongoDBConnection } from '../../../modules/AdminDBConnection.js';

const getUnits = Router();

setJSONPacketFormat({'slots': [], 'error': ''});
getUnits.get('/', getRequestPermission, (req, res) => {
    const responseFormat = {'slots': [], 'error': ''};
    if (req.allowedData.access != 'admin') {
        responseFormat.error = 'insufficient_permission';
        return res.json(responseFormat).status(403);
    }

    // otherwise, get all the slots
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);
    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.slots = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.getUnit({});
});

// gets all the dorm that is available (occupied or not)
getUnits.get('/available', getRequestPermission, (req, res) => {
    const responseFormat = {'slots': [], 'error': ''};
    if (req.allowedData.access != 'admin') {
        responseFormat.error = 'insufficient_permission';
        return res.json(responseFormat).status(403);
    }

    // otherwise, get all the slots
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);
    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.slots = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.getAvailableUnits();
});

export default getUnits;