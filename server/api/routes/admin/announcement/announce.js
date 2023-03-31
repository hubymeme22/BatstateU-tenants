import { Router } from "express";
import { postRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";
import { setAnnouncement, announceByEmail } from "../../../../modules/announcement.js";
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

    setAnnouncement(req.body.subject, req.body.message);
    const DBConnection = new AdminMongoDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(userdata => {
        const usernameList = Object.keys(userdata);
        const emailList = [];

        usernameList.forEach(username => { emailList.push(userdata[username].email); });
        responseFormat.announcedTo = announceByEmail(emailList);
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.retrieveAllStudentSummarizedData();
});

export default announce;