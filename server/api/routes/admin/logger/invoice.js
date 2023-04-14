import { Router } from "express";
import { setJSONPacketFormat, getRequestPermission } from "../../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../../modules/AdminDBConnection.js";

const invoiceLogs = Router();
setJSONPacketFormat({ logs: [], error: '' });

// returns the invoice logs of a student
invoiceLogs.get('/:username', getRequestPermission, (req, res) => {
    const responseFormat = { logs: [], error: '' };
    const DBConnection = new AdminMongoDBConnection(req.allowedData);

    DBConnection.setAcceptCallback(paymentData => {
        responseFormat.logs = paymentData;
        res.json(responseFormat);
    });

    DBConnection.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    DBConnection.getUserInvoiceLog(req.params.username);
});

export default invoiceLogs;