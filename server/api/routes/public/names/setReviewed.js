import { Router } from "express";
import { setJSONPacketFormat, postRequestPermission } from "../../../../middleware/tokenValidator.js";
import { names } from "../../../../modules/constants.js";
import paramChecker from "../../../../modules/paramchecker.js";

const setReviewed = Router();
setJSONPacketFormat({ assigned: false, error: '' });

// set the name for prepared by part
setReviewed.post('/reviewedBy', postRequestPermission, (req, res) => {
    const missedParams = paramChecker(['wholeName'], req.body);
    const responseFormat = { assigned: false, error: '' };

    if (missedParams.length > 0) {
        responseFormat.error = `missed_params=${missedParams}`;
        res.json(responseFormat);
    }

    names.reviewed = req.body.wholeName;
    responseFormat.assigned = true;
    res.json(responseFormat);
});

export default setReviewed;