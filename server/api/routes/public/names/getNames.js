import { Router } from "express";
import { setJSONPacketFormat, getRequestPermission } from "../../../../middleware/tokenValidator.js";
import { names } from "../../../../modules/constants.js";

const getNames = Router();
setJSONPacketFormat({ names: {}, error: '' });

// set the name for prepared by part
getNames.get('/', getRequestPermission, (req, res) => {
    const responseFormat = { names: {}, error: '' };
    responseFormat.names = names;
    res.json(responseFormat);
});

export default getNames;