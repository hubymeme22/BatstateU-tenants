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

export default getConstants;