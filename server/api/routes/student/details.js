import { Router } from "express";
import { StudentDBConnection } from "../../../modules/StudentDBConnection.js";
import { getRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";

const getStudentDetails = Router();
setJSONPacketFormat({error: '', userinfo: {}});

getStudentDetails.get('/', getRequestPermission, (req, res) => {
    const responseFormat = {error: '', userinfo: {}};
    const DBConnection = new StudentDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(userdetails => {
        responseFormat.userinfo = userdetails;
        res.json(responseFormat);
    });

    DBConnection.rejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.getAccountDetails();
});

export default getStudentDetails;