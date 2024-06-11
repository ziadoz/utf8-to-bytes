// @see: https://javascript.info/onload-ondomcontentloaded
export default function ready(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}