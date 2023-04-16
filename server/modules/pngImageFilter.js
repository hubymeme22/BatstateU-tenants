import fs from 'fs';

// This function simply checks for filebytes
// and confirms if the file is an image or not 
// in lightest way possible.

// I based this function from this source:
// https://www.w3.org/TR/PNG-Structure.html
export function pngWriteFilter(name, fileBytes, signatureErrCallback, fileErrCallback) {
    const pngSignature = [65533, 80, 78, 71, 13, 10, 26, 10];
    let passed = true;

    // matches the signature
    const tmpFileBytes = fileBytes.toString()
    for (let i = 0; i < tmpFileBytes.length; i++) {
        if (i == 8) break;
        if (tmpFileBytes.charCodeAt(i) != pngSignature[i]) {
            passed = false;
            break;
        }
    }

    // called when the file does not match a png bytes
    if (!passed) return signatureErrCallback();

    // saves the file on tmp folder
    name = name.split('.')[0];
    fs.writeFile('./server/tmp/' + (name + '.png'), fileBytes, fileErrCallback);
}