import { Router } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { StudentDBConnection } from "../../../../modules/StudentDBConnection.js";

const studentBillings = Router();
setJSONPacketFormat({error: '', billings: []});

// gets the unpaid student's billings
studentBillings.get('/unpaid', getRequestPermission, (req, res) => {
    const responseFormat = {error: '', billings: []};
    const DBConnection = new StudentDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(billdata => {
        responseFormat.billings = billdata;
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.getUserUnpaidBills();
});

// gets all the student's billings
studentBillings.get('/', getRequestPermission, (req, res) => {
    const responseFormat = {error: '', billings: []};
    const DBConnection = new StudentDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(billdata => {
        responseFormat.billings = billdata; 
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.getUserBills();
});

export default getStudentDetails;