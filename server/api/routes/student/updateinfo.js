import { Router } from "express";
import { postRequestPermission , setJSONPacketFormat } from "../../../middleware/tokenValidator.js";
import { StudentDBConnection } from "../../../modules/StudentDBConnection.js";
import paramChecker from "../../../modules/paramchecker.js";

const updateInfo = Router();
setJSONPacketFormat({error: '', update: {}});

// updates the 
updateInfo.post('/', postRequestPermission, (req, res) => {
    const responseFormat = { update: false, error: '' };
    const missedParams = paramChecker(['firstname', 'lastname', 'contact', 'password'], req.body);

    if (missedParams.length > 0) {
        responseFormat.error = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }

    const DBConnection = new StudentDBConnection(req.allowedData);
    DBConnection.setAcceptCallback(userdata => {
        responseFormat.update = userdata;
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        console.log(error);

        responseFormat.error = error;
        res.json(responseFormat);
    })

    DBConnection.changeInfo(req.body);
});

export default updateInfo;