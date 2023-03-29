import { Router } from "express";
import { postRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";
import paramChecker from "../../../../modules/paramchecker.js";

const announce = Router();
setJSONPacketFormat({error: '', added: false});

announce.post('/', postRequestPermission, (req, res) => {
    const missedParams = paramChecker(['subject', 'message'], req.body);
    const responseFormat = { error: '', announced: false };

    if (missedParams.length > 0) {
        responseFormat.error = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }
});

export default announce;