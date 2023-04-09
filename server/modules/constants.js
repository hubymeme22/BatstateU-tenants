export let waterDormPayment = 100;
export let roomDormPayment = 1000;
export let waterCanteenPayment = 100;
export let roomCanteenPayment = 1000;

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