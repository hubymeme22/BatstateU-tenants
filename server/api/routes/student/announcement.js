import { Router } from "express";
import { StudentDBConnection } from "../../../modules/StudentDBConnection.js";
import { getRequestPermission, setJSONPacketFormat } from "../../../middleware/tokenValidator.js";

const getAnnouncement = Router();
setJSONPacketFormat({error: '', billing: null});

// returns the finalized billing of the student
getAnnouncement.get('/', getRequestPermission, (req, res) => {
    const DBConnection = new StudentDBConnection(req.allowedData);
    DBConnection.setAcceptCallback(announcement => {
        res.json(announcement);
    });

    DBConnection.retrieveAnnouncement();
});

export default getAnnouncement;