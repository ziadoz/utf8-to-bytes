// @link: https://stackoverflow.com/a/62305199
export function strToChars(str) {
    return [...str];
}

export function charsToBytes(chars) {
    const bytes = {};

    for (const char of Array.from(chars)) {
        bytes[char] = charToBytes(char);
    }

    return bytes;
}

export function charToBytes(char) {
    return new TextEncoder().encode(char);
}

export function byteToBin(byte) {
    return parseInt(byte).toString(2).padStart(8, '0'); // Ensure 8 bits for 7-bit ASCII characters.
}

export function binToHex(bin) {
    return parseInt(bin, 2).toString(16).toUpperCase();
}

export function binToDec(bin) {
    return parseInt(bin, 2).toString(10);
}

export function parseBin(bin) {
    if (bin.charAt(0) === '0') {
        return {
            continuation: '',
            remainder: bin,
        };
    }

    const str = bin;
    const index = bin.indexOf('0') + 1 ;

    return {
        continuation: str.substring(0, index),
        remainder: str.substring(index),
    };
}