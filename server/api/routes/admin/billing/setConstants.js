import { Router } from "express";
import { setJSONPacketFormat, getRequestPermission } from "../../../../middleware/tokenValidator.js";
import * as sc from '../../../../modules/constants.js';

const setConstants = Router();
setJSONPacketFormat({updated: false, error: ''});

// updates the water payment bill value
setConstants.put('/update/waterBill/:value', getRequestPermission, (req, res) => {
    const responseFormat = { updated: false, error: '' };

    try {
        const numericalValue = parseFloat(req.params.value);
        if (Number.isNaN(numericalValue)) {
            responseFormat.error = 'NaNValueNotAllowed';
            return res.json(responseFormat);    
        }

        sc.setWaterPaymentValue(numericalValue);
        responseFormat.updated = true;
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
});

// updates the water payment bill value
setConstants.put('/update/roomBill/:value', getRequestPermission, (req, res) => {
    const responseFormat = { updated: false, error: '' };

    try {
        const numericalValue = parseFloat(req.params.value);
        if (Number.isNaN(numericalValue)) {
            responseFormat.error = 'NaNValueNotAllowed';
            return res.json(responseFormat);    
        }

        sc.setRoomPaymentValue(numericalValue);
        responseFormat.updated = true;
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
});

export default setConstants;