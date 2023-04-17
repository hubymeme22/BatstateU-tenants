import { signatures } from '../../../../modules/constants.js';
import { getRequestPermission, setJSONPacketFormat } from '../../../../middleware/tokenValidator.js';
import { Router } from 'express';
import fs from 'fs';

const getReviewedSignature = Router();
setJSONPacketFormat({});

getReviewedSignature.get('/reviewer', getRequestPermission, (req, res) => {
    if (fs.existsSync(signatures.reviewed))
        return res.sendFile(signatures.reviewed);
    return res.send(null);
});

export default getReviewedSignature;