import { Router } from "express";
import { setJSONPacketFormat, getRequestPermission } from "../../../../middleware/tokenValidator.js";
import * as sc from '../../../../modules/constants.js';

const setConstants = Router();
setJSONPacketFormat({updated: false, error: ''});

// updates the water payment bill value
setConstants.put('/update/waterBill/dorm/:value', getRequestPermission, (req, res) => {
    const responseFormat = { updated: false, error: '' };

    try {
        const numericalValue = parseFloat(req.params.value);
        if (Number.isNaN(numericalValue)) {
            responseFormat.error = 'NaNValueNotAllowed';
            return res.json(responseFormat);    
        }

        sc.seDormtWaterPaymentValue(numericalValue);
        responseFormat.updated = true;
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
});

// updates the water payment bill value
setConstants.put('/update/waterBill/canteen/:value', getRequestPermission, (req, res) => {
    const responseFormat = { updated: false, error: '' };

    try {
        const numericalValue = parseFloat(req.params.value);
        if (Number.isNaN(numericalValue)) {
            responseFormat.error = 'NaNValueNotAllowed';
            return res.json(responseFormat);    
        }

        sc.setCanteenWaterPaymentValue(numericalValue);
        responseFormat.updated = true;
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
});

setConstants.put('/update/roomBill/dorm/:value', getRequestPermission, (req, res) => {
    const responseFormat = { updated: false, error: '' };

    try {
        const numericalValue = parseFloat(req.params.value);
        if (Number.isNaN(numericalValue)) {
            responseFormat.error = 'NaNValueNotAllowed';
            return res.json(responseFormat);    
        }

        sc.setDormRoomPaymentValue(numericalValue);
        responseFormat.updated = true;
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
});

// updates the water payment bill value
setConstants.put('/update/roomBill/canteen/:value', getRequestPermission, (req, res) => {
    const responseFormat = { updated: false, error: '' };

    try {
        const numericalValue = parseFloat(req.params.value);
        if (Number.isNaN(numericalValue)) {
            responseFormat.error = 'NaNValueNotAllowed';
            return res.json(responseFormat);    
        }

        sc.setCanteenRoomPaymentValue(numericalValue);
        responseFormat.updated = true;
        res.json(responseFormat);

    } catch (err) {
        responseFormat.error = err;
        res.json(responseFormat);
    }
});

// updates the reference number
setConstants.put('/header/referenceNumber', getRequestPermission, (req, res) => {
    const { updateData } = req.body;
    sc.refNumber = updateData;

    res.json({ updated: true, error: '' });
});

// updates the effectivity date
setConstants.put('/header/effectivityDate', getRequestPermission, (req, res) => {
    const { updateData } = req.body;
    sc.effectivityDate = updateData;

    res.json({ updated: true, error: '' });
});

// updates the revision date
setConstants.put('/header/revision', getRequestPermission, (req, res) => {
    const { updateData } = req.body;
    sc.revNumber = updateData;

    res.json({ updated: true, error: '' });
});

export default setConstants;