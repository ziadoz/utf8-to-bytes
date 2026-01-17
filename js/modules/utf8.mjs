import { database } from 'database';

// @link: https://stackoverflow.com/a/62305199
// @link: https://bsky.app/profile/did:plc:etdjdgnly5tz5l5xdd4jq76d/post/3m3umixshqs2r
export function strToChars(str) {
    return Array.from(new Intl.Segmenter().segment(str))
        .map((segment) => segment.segment);
}

export function charToBytes(char) {
    return new TextEncoder().encode(char);
}

export function charToName(hex) {
    return database[hex.padStart(4, '0')] ?? '';
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
