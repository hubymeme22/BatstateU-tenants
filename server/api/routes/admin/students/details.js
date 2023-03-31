import { Router } from "express";
import { getRequestPermission, postRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";
import paramChecker from "../../../../modules/paramchecker.js";

const getStudentDetails = Router();
setJSONPacketFormat({ error: '', details: []});

// gets all the user's information (admin permission)
// returns account info (student permission)
getStudentDetails.get('/details', getRequestPermission, (req, res) => {
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

    return DBConnection.retrieveAllStudentData();
});

// this route gets all the verified student account details
getStudentDetails.get('/details/verified', getRequestPermission, (req, res) => {
    const responseFormat = {error: '', details: []};
    const DBConnection = new AdminMongoDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(userdata => {
        responseFormat.details = userdata;
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.retrieveAllVerifiedAccountData();
});

// this route gets all the unverified student account details
getStudentDetails.get('/details/unverified', getRequestPermission, (req, res) => {
    const responseFormat = {error: '', details: []};
    const DBConnection = new AdminMongoDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(userdata => {
        responseFormat.details = userdata;
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.retrieveAllUnverifiedAccountData();
});

// this route gets all the student account details that matches the description
getStudentDetails.post('/details/search', postRequestPermission, (req, res) => {
    const responseFormat = {error: '', details: []};
    const missedParams = paramChecker(['area', 'status', 'srCode', 'name'], req.body);

    if (missedParams.length > 0) {
        responseFormat.error = `missed_params=${missedParams}`;
        return res.json(responseFormat);
    }

    const DBConnection = new AdminMongoDBConnection(req.allowedData);
    DBConnection.setAcceptCallback(userdata => {
        responseFormat.details = userdata;
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.studentGeneralSearch(req.body);
});


export default getStudentDetails;