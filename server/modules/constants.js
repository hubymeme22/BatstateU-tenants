import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export let waterDormPayment = 100;
export let roomDormPayment = 1000;
export let waterCanteenPayment = 100;
export let roomCanteenPayment = 1000;

export let refNumber = 'BatStateU-Fo-RGO-13';
export let effectivityDate = 'February 06, 2023';
export let revNumber = '01';

// contains name of personels
export const names = {
    'prepared': '',
    'reviewed': '',
    'verified': '',
    'recieved': ''
}

// contains base64 encoded images of their signatures
export const signatures = {
    'prepared': path.join(__dirname, '..', 'tmp', 'prepared.png'),
    'reviewed': path.join(__dirname, '..', 'tmp', 'reviewer.png'),
    'verified': path.join(__dirname, '..', 'tmp', 'verified.png')
}

export function seDormtWaterPaymentValue(newWater) {
    waterDormPayment = newWater;
}

export function setDormRoomPaymentValue(newRoom) {
    roomDormPayment = newRoom;
}

export function setCanteenWaterPaymentValue(newWater) {
    waterCanteenPayment = newWater;
}

export function setCanteenRoomPaymentValue(newRoom) {
    roomCanteenPayment = newRoom;
}