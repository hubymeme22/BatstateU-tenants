import { Router } from "express";
import { postRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../modules/DBConnection.js";
import paramChecker from "../../../modules/paramchecker.js";
import utcDateParser from "../../../modules/UTCDateParser.js";

const addBilling = Router();

setJSONPacketFormat({error: '', added: false});
addBilling.post('/room/:slot', postRequestPermission, (req, res) => {
    const missedParams = paramChecker(['date', 'rate', 'current_kwh'], req.body);
    if (missedParams.length > 0)
        return res.json({ error: `missed_params=${missedParams}`, added: false});

    const adminDatabase = new AdminMongoDBConnection(req.allowedData);
    adminDatabase.setAcceptCallback(userdata => {
        res.json({
            error: '',
            added: true
        })
    });

    adminDatabase.setRejectCallback(error => {
        res.json({
            error: error,
            added: false
        })
    });

    // simple date parser, i know this sounds crazy... given
    // that javascript dates are quite disturbing
    // case: date - must be in UTC string format
    // format: YYYY-MM-DDThh:mm:ss
    const dateAssigned = utcDateParser(req.body.date);
    adminDatabase.addRoomBill(req.params.slot, dateAssigned, req.body.rate, req.body.current_kwh);
});

export default addBilling;