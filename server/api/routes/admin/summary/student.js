import { Router } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";

const studentSummary = Router();
setJSONPacketFormat({ error: '', details: []});

// gets all the user's information (admin permission)
// returns account info (student permission)
studentSummary.get('/student', getRequestPermission, (req, res) => {
    const responseFormat = {error: '', details: []};

    // return all the user information
    const DBConnection = new AdminMongoDBConnection(req.allowedData);
    DBConnection.setAcceptCallback(userdata => {
        if (userdata == null) responseFormat.error = 'NoDataAllowed';
        responseFormat.details = userdata;
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.retrieveAllStudentSummarizedData();
});

export default studentSummary;