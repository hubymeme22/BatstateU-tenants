import { Router } from "express";
import { postRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";
import { sendMail } from "../../../../modules/Mailer.js";
import paramChecker from "../../../../modules/paramchecker.js";

const announce = Router();
setJSONPacketFormat({error: '', announcedTo: []});

announce.post('/', postRequestPermission, (req, res) => {
    const missedParams = paramChecker(['subject', 'message'], req.body);
    const responseFormat = { error: '', announcedTo: [] };

    if (missedParams.length > 0) {
        responseFormat.error = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }

    const DBConnection = new AdminMongoDBConnection(req.allowedData);
    DBConnection.setAcceptCallback(userdata => {
        const usernameList = Object.keys(userdata);
        usernameList.forEach(username => {
            // email the students here
        });

        // updates the announcement database
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.retrieveAllStudentData();
});

export default announce;