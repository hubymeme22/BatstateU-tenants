import { Router } from 'express';
import { setJSONPacketFormat, postRequestPermission } from '../../../middleware/tokenValidator.js';
import { AdminMongoDBConnection } from '../../../modules/AdminDBConnection.js';
import paramChecker from '../../../modules/paramchecker.js';

const addUnit = Router();

setJSONPacketFormat({'added': false, 'error': ''});
addUnit.post('/new', postRequestPermission, (req, res) => {
    const missedParams = paramChecker(['slot_id', 'max_slot'], req.body);
    if (missedParams.length > 0) {
        return res.json({
            'added': false,
            'error': `missed_params=${missedParams}`
        });
    }

    const adminDatabase = new AdminMongoDBConnection(req.allowedData);
    adminDatabase.setAcceptCallback(userdata => {
        res.json({
            added: true,
            error: ''
        });
    });

    adminDatabase.setRejectCallback(error => {
        res.json({
            added: false,
            error: error
        }).status(400);
    });

    adminDatabase.addUnit(req.body.slot_id, req.body.max_slot);
});

export default addUnit;