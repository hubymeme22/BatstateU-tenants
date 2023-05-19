import { Router } from "express";
import { setJSONPacketFormat, getRequestPermission } from "../../../../middleware/tokenValidator.js";
import * as sc from '../../../../modules/constants.js';

const getConstants = Router();
setJSONPacketFormat({updated: false, error: ''});

getConstants.get('/waterBill/dorm', getRequestPermission, (req, res) => {
    res.json({
        error: '',
        waterBill: sc.waterDormPayment
    });
});

getConstants.get('/waterBill/canteen', getRequestPermission, (req, res) => {
    res.json({
        error: '',
        waterBill: sc.waterCanteenPayment
    });
});

getConstants.get('/roomBill/dorm', getRequestPermission, (req, res) => {
    res.json({
        error: '',
        roomBill: sc.roomDormPayment
    });
});

getConstants.get('/roomBill/canteen', getRequestPermission, (req, res) => {
    res.json({
        error: '',
        roomBill: sc.roomCanteenPayment
    });
});

getConstants.get('/paymentValues', getRequestPermission, (req, res) => {
    res.json({
        error: '',
        roomBill: {
            dormWater: sc.waterDormPayment,
            dormRoom: sc.roomDormPayment,
            canteenWater: sc.waterCanteenPayment,
            canteenRoom: sc.roomCanteenPayment
        }
    });
});

getConstants.get('/header/referenceNumber', getRequestPermission, (req, res) => {
    res.json({ ref: sc.refNumber, error: '' });
});

getConstants.put('/header/effectivityDate', getRequestPermission, (req, res) => {
    res.json({ effectivityDate: sc.effectivityDate, error: '' });
});

getConstants.put('/header/revision', getRequestPermission, (req, res) => {
    res.json({ revision: sc.revNumber, error: '' });
});

export default getConstants;