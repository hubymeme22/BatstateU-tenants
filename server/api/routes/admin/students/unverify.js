import { Router } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";
import paramChecker from "../../../../modules/paramchecker.js";

const unverify = Router();

setJSONPacketFormat({ error: '', verified: false });
unverify.put("/unverify/:username", getRequestPermission, (req, res) => {
    const missedParams = paramChecker(['username'], req.params);
    const responseFormat = { error: '', unverified: false };

    if (missedParams.length > 0) {
        responseFormat['error'] = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }

    const dbConnection = new AdminMongoDBConnection(req.allowedData);
    dbConnection.setAcceptCallback(userdata => {
        responseFormat.unverified = true;
        res.json(responseFormat);
    });

    dbConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    dbConnection.unverifyStudent(req.params.username);
});

export default unverify;