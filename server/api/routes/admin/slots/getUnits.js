import { Router } from 'express';
import { setJSONPacketFormat, getRequestPermission } from '../../../../middleware/tokenValidator.js';
import { AdminMongoDBConnection } from '../../../../modules/AdminDBConnection.js';

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

    adminDatabase.getAllUnits();
});

// gets the room information of all the dorms
getUnits.get('/dorm', getRequestPermission, (req, res) => {
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

    adminDatabase.getAllDormUnits();
});

// gets the room information of all the canteen slots
getUnits.get('/canteen', getRequestPermission, (req, res) => {
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

    adminDatabase.getAllCanteenUnits();
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

// gets all the dorm that is available and with specified number of spaces
getUnits.get('/available/:space', getRequestPermission, (req, res) => {
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

    try {
        adminDatabase.getUnitsWithSpace((req.params.space));
    } catch(err) {
        responseFormat.error = 'InvalidSpaceType';
        res.json(responseFormat);
    }
});

getUnits.get('/summary', getRequestPermission, (req, res) => {
    const responseFormat = {'summary': {}, 'error': ''};

    // otherwise, get all the slots
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);
    adminDatabase.setAcceptCallback(summary => {
        responseFormat.summary = summary;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.getRoomSummaryData();
});

export default getUnits;