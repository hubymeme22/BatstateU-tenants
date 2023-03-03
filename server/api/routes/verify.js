import { Router } from "express";
import { postRequestPermission, setJSONPacketFormat } from "../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../modules/DBConnection.js";
import paramChecker from "../../modules/paramchecker.js";

const verify = Router();

setJSONPacketFormat({ error: '', verified: false });
verify.post("/", postRequestPermission, (req, res) => {
    const missedParams = paramChecker(['username'], req.body);
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
        responseFormat.error = error;
        res.json(responseFormat);
    });

    dbConnection.verifyStudent(req.body.username);
});

export default verify;