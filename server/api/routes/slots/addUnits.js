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

    const responseFormat = { added: [], error: '' };
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);

    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.added = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.addUnit(req.body.slot_id, req.body.max_slot);
});

export default addUnit;