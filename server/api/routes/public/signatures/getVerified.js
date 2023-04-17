import { signatures } from '../../../../modules/constants.js';
import { getRequestPermission, setJSONPacketFormat } from '../../../../middleware/tokenValidator.js';
import { Router } from 'express';
import fs from 'fs';

const getVerifiedSignature = Router();
setJSONPacketFormat({});

getVerifiedSignature.get('/verifier', getRequestPermission, (req, res) => {
    if (fs.existsSync(signatures.verified))
        return res.sendFile(signatures.verified);
    return res.send(null);
});

export default getVerifiedSignature;