import { Router } from "express";
import { postRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";
import { AdminMongoDBConnection } from "../../../modules/AdminDBConnection.js";
// import paramChecker from "../../../modules/paramchecker.js";
// base code structure is from Hubert, 
const deleteBilling = Router();

setJSONPacketFormat({error: '', deleted: false});
deleteBilling.delete('/:slot/:username', postRequestPermission, (req, res) => {
    const responseFormat = { deleted: [], error: '' };
    const adminDatabase = new AdminMongoDBConnection(req.allowedData);

    adminDatabase.setAcceptCallback(userdata => {
        responseFormat.deleted = userdata;
        res.json(responseFormat);
    });

    adminDatabase.setRejectCallback(error => {
        responseFormat.error = error;
        res.json(responseFormat);
    });

    adminDatabase.deleteUserBill(req.params.slot, req.params.username);
});

export default deleteBilling;