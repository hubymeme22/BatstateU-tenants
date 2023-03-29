import { Router } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";

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
        console.log(error);

        responseFormat.error = error;
        res.json(responseFormat);
    });

    return DBConnection.retrieveAllStudentData();
});

export default getStudentDetails;