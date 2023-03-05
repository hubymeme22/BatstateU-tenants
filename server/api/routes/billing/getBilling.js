import { Router } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../modules/AdminDBConnection.js";

const getBillings = Router();
setJSONPacketFormat({ error: '', billings: ''});

// gets all the billings
getBillings.get('/', getRequestPermission, (req, res) => {
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);
    adminDatabase.setAcceptCallback(userdata => {
        res.json({
            error: '',
            billings: userdata
        });
    });

    adminDatabase.setRejectCallback(error => {
        res.json({
            error: error,
            billings: ''
        });
    });

    adminDatabase.getAllBills();
});

// gets all the specified user's billings
getBillings.get('/:username', getRequestPermission, (req, res) => {
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);
    adminDatabase.setAcceptCallback(userdata => {
        res.json({
            error: '',
            billings: userdata
        });
    });

    adminDatabase.setRejectCallback(error => {
        res.json({
            error: error,
            billings: ''
        });
    });

    adminDatabase.getIndivBilling(req.params.username);
});

// gets all the billings that are not fully paid
getBillings.get('/unpaid', getRequestPermission, (req, res) => {
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);
    adminDatabase.setAcceptCallback(userdata => {
        res.json({
            error: '',
            billings: userdata
        });
    });

    adminDatabase.setRejectCallback(error => {
        res.json({
            error: error,
            billings: ''
        });
    });

    adminDatabase.getAllUnpaidBills();
});

// gets all the specified user's billings
getBillings.get('/unpaid/:username', getRequestPermission, (req, res) => {
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);
    adminDatabase.setAcceptCallback(userdata => {
        res.json({
            error: '',
            billings: userdata
        });
    });

    adminDatabase.setRejectCallback(error => {
        res.json({
            error: error,
            billings: ''
        });
    });

    adminDatabase.getIndivUnpaidBilling(req.params.username);
});

export default getBillings;