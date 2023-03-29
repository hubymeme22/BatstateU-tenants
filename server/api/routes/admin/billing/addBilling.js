import { Router } from "express";
import { postRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";
import paramChecker from "../../../../modules/paramchecker.js";

const addBilling = Router();

setJSONPacketFormat({error: '', added: false});
addBilling.post('/:slot/:username', postRequestPermission, (req, res) => {
    const missedParams = paramChecker(['month', 'day', 'year', 'rate', 'previous_kwh', 'current_kwh', 'days_present'], req.body);
    if (missedParams.length > 0)
        return res.json({ error: `missed_params=${missedParams}`, added: false});

    const responseFormat = { added: [], error: '' };
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);

    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.added = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        console.log(error);
        responseFormat.error = error;
        res.json(responseFormat);
    });

    // simple date parser, i know this sounds crazy... given
    // that javascript dates are quite disturbing
    // case: date - must be in UTC string format
    // format: YYYY-MM-DDThh:mm:ss
    const costDetails = {
        rate: req.body.rate,
        previous_kwh: req.body.previous_kwh,
        current_kwh: req.body.current_kwh,
        month: req.body.month,
        day: req.body.day,
        year: req.body.year,
        days_present: req.body.days_present
    };

    adminDatabase.addUserBill(req.params.slot, req.params.username, costDetails);
});

export default addBilling;