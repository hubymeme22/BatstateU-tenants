import { Router } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../modules/AdminDBConnection.js";

const studentPayment = Router();
setJSONPacketFormat({error: '', paid: false});

// marks the billing as paid
studentPayment.put('/pay/:srCode', getRequestPermission, (req, res) => {
    const responseFormat = {paid: false, error: ''};
    const DBConnection = new AdminMongoDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(userdata => {
        console.log(userdata);
    });

    DBConnection.setRejectCallback(error => {
        console.log(error);
    })

    DBConnection.markAsPaid(req.params.srCode);
});