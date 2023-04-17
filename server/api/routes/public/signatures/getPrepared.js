import { signatures } from '../../../../modules/constants.js';
import { getRequestPermission, setJSONPacketFormat } from '../../../../middleware/tokenValidator.js';
import { Router } from 'express';
import fs from 'fs';

const getPreparedSignature = Router();
setJSONPacketFormat({});

getPreparedSignature.get('/prepare', getRequestPermission, (req, res) => {
    if (fs.existsSync(signatures.prepared))
        return res.sendFile(signatures.prepared);
    return res.send(null);
});

export default getPreparedSignature;