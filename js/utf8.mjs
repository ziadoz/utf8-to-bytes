// @link: https://stackoverflow.com/a/62305199
export function strToChars(str) {
    return [...str];
}

export function charsToBytes(chars) {
    const bytes = {};

    for (const char of Array.from(chars)) {
        bytes[char] = new TextEncoder().encode(char);
    }

    return bytes;
}

export function byteToBin(byte) {
    return parseInt(byte).toString(2);
}

export function byteToHex(byte) {
    return parseInt(byte).toString(16).toUpperCase();
}

export function binToHex(bin) {
    return parseInt(bin, 2).toString(16).toUpperCase();
}

export function binToDec(bin) {
    return parseInt(bin, 2).toString(10);
}

export function splitBin(bin) {
    const str = parseInt(bin, 2).toString(2);
    const index = str.indexOf('0') + 1 ;

    return {
        continuation: str.substring(0, index),
        remainder: str.substring(index),
    };
}

// export function binToDec(bin) {
//     return parseInt(bin, 2).toString(10);
// }
//
// export function binToExplain(bin) {
//     const bits = [];
//     let isContinuation = true;
//
//     for (const bit of bin) {
//         bits.push({ bit: bit, continuation: isContinuation });
//
//         if (bit === '0') {
//             isContinuation = false;
//         }
//     }
//
//     return {
//         hex: binToHex(bin),
//         value: bits.filter(bit => ! bit.continuation).map(bit => bit.bit).join(''),
//         bits: bits,
//     };
// }