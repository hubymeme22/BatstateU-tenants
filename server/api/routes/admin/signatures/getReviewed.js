import { signatures } from '../../../../modules/constants.js';
import { Router } from 'express';
import fs from 'fs';

const getReviewedSignature = Router();
getReviewedSignature.get('/reviewer', (req, res) => {
    if (fs.existsSync(signatures.reviewed))
        return res.sendFile(signatures.reviewed);
    return res.send(null);
});

export default getReviewedSignature;