import { Router } from "express";
import { postRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";
import paramChecker from "../../../../modules/paramchecker.js";

const addBilling = Router();
setJSONPacketFormat({error: '', added: false});

addBilling.post('/multiple/:slot', postRequestPermission, (req, res) => {
    let missedParams = paramChecker([
        'startDate', 'endDate',
        'rate', 'previous_kwh',
        'current_kwh', 'days_present',
        'users'], req.body);

    if (missedParams.length > 0)
        return res.json({ error: `missed_params=${missedParams}`, added: false});

    // another checking for startDate object
    missedParams = paramChecker(['month', 'day', 'year'], req.body.startDate);
    if (missedParams.length > 0)
        return res.json({ error: `missed_params=startDate:${missedParams}`, added: false});

    // another checking for endDate object
    missedParams = paramChecker(['month', 'day', 'year'], req.body.endDate);
    if (missedParams.length > 0)
        return res.json({ error: `missed_params=startDate:${missedParams}`, added: false});

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

    const costDetails = {
        rate: req.body.rate,
        previous_kwh: req.body.previous_kwh,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        current_kwh: req.body.current_kwh,
        days_present: req.body.days_present,
    };

    adminDatabase.addMultipleUserBill(req.params.slot, req.body.users, costDetails);
});

addBilling.post('/:slot/:username', postRequestPermission, (req, res) => {
    const missedParams = paramChecker([
        'startDate', 'endDate',
        'rate', 'previous_kwh',
        'current_kwh', 'days_present'], req.body);

    if (missedParams.length > 0)
        return res.json({ error: `missed_params=${missedParams}`, added: false});

    // another checking for startDate object
    missedParams = paramChecker(['month', 'day', 'year'], req.body.startDate);
    if (missedParams.length > 0)
        return res.json({ error: `missed_params=startDate:${missedParams}`, added: false});

    // another checking for endDate object
    missedParams = paramChecker(['month', 'day', 'year'], req.body.endDate);
    if (missedParams.length > 0)
        return res.json({ error: `missed_params=startDate:${missedParams}`, added: false});

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

    // simple date parser, i know this sounds crazy... given
    // that javascript dates are quite disturbing
    // case: date - must be in UTC string format
    // format: YYYY-MM-DDThh:mm:ss
    const costDetails = {
        rate: req.body.rate,
        previous_kwh: req.body.previous_kwh,
        current_kwh: req.body.current_kwh,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        days_present: req.body.days_present
    };

    adminDatabase.addUserBill(req.params.slot, req.params.username, costDetails);
});

export default addBilling;