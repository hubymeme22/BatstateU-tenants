import { Router } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";

const getBillings = Router();
setJSONPacketFormat({ error: '', billings: []});

// gets the reported billing for a specific user
getBillings.get('/report/:username', getRequestPermission, (req, res) => {
    const responseFormat = {report: {}, error: ''};
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);

    adminDatabase.setAcceptCallback(billreport => {
        responseFormat.report = billreport;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.getBillingReport(req.params.username);
});

// gets all the specified user's billings
getBillings.get('/unpaid/:username', getRequestPermission, (req, res) => {
    const responseFormat = {billings: [], error: ''};
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);

    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.billings = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.getIndivUnpaidBilling(req.params.username);
});

// gets all the billings that are not fully paid
getBillings.get('/unpaid', getRequestPermission, (req, res) => {
    const responseFormat = {billings: [], error: ''};
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);

    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.billings = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.getAllUnpaidBills();
});

// gets all the specified user's billings
getBillings.get('/:username', getRequestPermission, (req, res) => {
    const responseFormat = {billings: [], error: ''};
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);

    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.billings = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.getIndivBilling(req.params.username);
});

// gets all the billings
getBillings.get('/', getRequestPermission, (req, res) => {
    const responseFormat = {billings: [], error: ''};
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);

    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.billings = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(error);
    });

    adminDatabase.getAllBills();
});

export default getBillings;