import { Router } from "express";
import { StudentDBConnection } from "../../../modules/StudentDBConnection.js";
import { getRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";

const getStudentBilling = Router();
setJSONPacketFormat({error: '', billing: null});

// returns the finalized billing of the student
getStudentBilling.get('/finalized', getRequestPermission, (req, res) => {
    const responseFormat = {billing: {}, error: ''};
    const DBConnection = new StudentDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(billreport => {
        responseFormat.billing = billreport;
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.getStudentFinalizedBilling();
});

// returns all the list of unpaid bills
getStudentBilling.get('/unpaid', getRequestPermission, (req, res) => {
    const responseFormat = {error: '', billing: []};
    const DBConnection = new StudentDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(userdetails => {
        responseFormat.billing = userdetails;
        res.json(responseFormat);
    });

    DBConnection.rejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.getUserUnpaidBills();
});

// returns the latest billing
getStudentBilling.get('/latest', getRequestPermission, (req, res) => {
    const responseFormat = {error: '', billing: []};
    const DBConnection = new StudentDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(userdetails => {
        responseFormat.billing = userdetails;
        res.json(responseFormat);
    });

    DBConnection.rejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.getLatestUserBill();
});

// returns ALL the bills
getStudentBilling.get('/', getRequestPermission, (req, res) => {
    const responseFormat = {error: '', billing: []};
    const DBConnection = new StudentDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(userdetails => {
        responseFormat.billing = userdetails;
        res.json(responseFormat);
    });

    DBConnection.rejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.getUserBills();
});

export default getStudentBilling;