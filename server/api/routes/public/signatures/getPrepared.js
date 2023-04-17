import { signatures } from '../../../../modules/constants.js';
import { Router } from 'express';
import fs from 'fs';

const getPreparedSignature = Router();
getPreparedSignature.get('/prepare', (req, res) => {
    if (fs.existsSync(signatures.prepared))
        return res.sendFile(signatures.prepared);
    return res.send(null);
});

export default getPreparedSignature;