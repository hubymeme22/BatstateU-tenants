import { Router } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../modules/AdminDBConnection.js";
import paramChecker from "../../../modules/paramchecker.js";

const verify = Router();

setJSONPacketFormat({ error: '', verified: false });
verify.put("/verify/:username", getRequestPermission, (req, res) => {
    const missedParams = paramChecker(['username'], req.params);
    const responseFormat = { error: '', verified: false };

    if (missedParams.length > 0) {
        responseFormat['error'] = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }

    const dbConnection = new AdminMongoDBConnection(req.allowedData);
    dbConnection.setAcceptCallback(userdata => {
        responseFormat.verified = true;
        res.json(responseFormat);
    });

    dbConnection.setRejectCallback(error => {
        console.log(error);

        responseFormat.error = error;
        res.json(responseFormat);
    });

    dbConnection.verifyStudent(req.params.username);
});

export default verify;