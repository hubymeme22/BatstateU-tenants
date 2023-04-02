import { Router, response } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";

const studentPayment = Router();
setJSONPacketFormat({error: '', paid: false});

// marks the billing as paid
studentPayment.put('/pay/:srCode', getRequestPermission, (req, res) => {
    const responseFormat = {paid: false, error: ''};
    const DBConnection = new AdminMongoDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(userdata => {
        if (userdata.length > 0) responseFormat.paid = true;
        else responseFormat.error = 'NoBillingsForUser';

        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    })

    DBConnection.markAsPaid(req.params.srCode);
});

export default studentPayment;