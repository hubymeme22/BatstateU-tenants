import { Router } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../modules/AdminDBConnection.js";

const deleteBilling = Router();

// this a billing to a room specific username
setJSONPacketFormat({error: '', deleted: false});
deleteBilling.delete('/:slot/:username', getRequestPermission, (req, res) => {
    const responseFormat = { deleted: [], error: '' };
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);

    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.deleted = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        console.log(error);

        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.deleteUserBill(req.params.slot, req.params.username);
});

export default deleteBilling;