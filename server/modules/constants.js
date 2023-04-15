export let waterDormPayment = 100;
export let roomDormPayment = 1000;
export let waterCanteenPayment = 100;
export let roomCanteenPayment = 1000;

// contains name of personels
export const names = {
    'prepared': '',
    'reviewed': '',
    'verified': '',
    'recieved': ''
}

// contains base64 encoded images of their signatures
export const signatures = {
    'prepared': '',
    'reviewed': '',
    'verified': '',
    'recieved': ''
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