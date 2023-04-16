import { Router } from "express";
import { getRequestPermission, setJSONPacketFormat } from "../../../../middleware/tokenValidator.js";
import { pngWriteFilter } from '../../../../modules/pngImageFilter.js';

const uploadVerified = Router();

setJSONPacketFormat({ uploaded: false, error: '' });
uploadVerified.post('/verifier', getRequestPermission, (req, res) => {
    if (!req.files)
        return res.json({ uploaded: false, error: 'NoFilesRecieved' });

    // retrieves the first file uploaded
    const fileUploaded = Object.keys(req.files);
    if (fileUploaded.length <= 0)
        return res.json({ uploaded: false, error: 'NoFileBytesRecieved' });

    const filedata = req.files[fileUploaded[0]];
    const fileBuffer = filedata.data;
    const signatureErrCallback = () => {
        res.json({ uploaded: false, error: 'SignatureNotPNG' });
    };

    pngWriteFilter('verified', fileBuffer, signatureErrCallback, (err) => {
        if (err) return res.json({ uploaded: false, error: err })
        res.json({ uploaded: true, error: '' })
    });
});

export default uploadVerified;