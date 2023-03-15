import { sendMail } from "./Mailer.js";

export const recoveryMap = {};
export const passmap = {};

// for generating ID (from stackoverflow:
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript?page=1&tab=scoredesc#tab-top)
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
}

// generates a random pin for confirmation
export function generatePin() {
    return Math.floor((Math.random() * 90000000) + 10000000)
}

// generates a new unique ID for pin validation
export function generatePinID(pin, passid) {
    let generated = makeid(20);
    while (recoveryMap[generated] != null) {
        generated = makeid(20);
    }

    recoveryMap[generated] = { pin: pin, passid: passid};
    return generated;
}

// // confirms if the pin is the valid pin
// export function confirmPin(id, pin) {
//     console.log(recoveryMap);
//     if (recoveryMap[id] == null)
//         return null

//     console.log(recoveryMap[id].pin);
//     return (recoveryMap[id].pin == pin);
// }

// gets the mapped passid on pin
export function getPinKey(id) {
    if (recoveryMap[id] == null)
        return null
    return recoveryMap[id].passid;
}

export function remove(id) {
    delete recoveryMap[id];
}

// generates a new unique one-time use id for password changing
export function generateCPasswordID(email) {
    let generated = makeid(20);
    while (passmap[generated] != null) {
        generated = makeid(20);
    }

    passmap[generated] = email;
    return generated;
}

// gets the email based on id
export function getCEmail(id) {
    return passmap[id];
}

// i see what you did there
export function passchanged(id) {
    delete changePassMap[id];
}

// template for password recovery email
export function passwordRecoveryEmail(userEmail, generatedCode, acceptCallback, rejectCallback) {
    const subject = 'PASSWORD RESET';
    const text = `Hello Dear Spartan!\nLooks like you forgot your password, but no worries! you can still retrieve\nit by entering the code: <b>${generatedCode}</b>. If you don't intend to change your\npassword but recieved this message, it is adviced that you change your password\nimmediately as this means someone's trying to access your account.`;
    sendMail(userEmail, subject, text, acceptCallback, rejectCallback);
}