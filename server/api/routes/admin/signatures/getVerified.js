import { signatures } from '../../../../modules/constants.js';
import { Router } from 'express';
import fs from 'fs';

const getVerifiedSignature = Router();
getVerifiedSignature.get('/verifier', (req, res) => {
    if (fs.existsSync(signatures.verified))
        return res.sendFile(signatures.verified);
    return res.send(null);
});

export default getVerifiedSignature;