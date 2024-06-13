import { binToDec, binToHex, byteToBin, charToBytes, parseBin } from 'utf8';

export default class CharToBytes extends HTMLElement
{
    #char = '';
    #charBin = '';
    #charHex = '';
    #charDec = '';
    #bytes = [];

    connectedCallback() {
        this.#char = this.getAttribute('char');
        this.#bytes = [];

        for (const byte of charToBytes(this.#char)) {
            const bin = byteToBin(byte);
            const parsed = parseBin(bin);
            const hex = binToHex(bin);
            const dec = binToDec(bin);
            const val = binToDec(parsed.remainder);

            this.#bytes.push({ parsed, hex, dec, bin, val });
        }

        this.#charBin = this.#bytes.map(byte => byte.parsed.remainder).join('');
        this.#charHex = binToHex(this.#charBin);
        this.#charDec = binToDec(this.#charBin);

        this.innerHTML = this.renderDetails();
    }

    renderDetails() {
        return `
        <details open>
            <summary>
                ${this.#char}
                (<code title="Binary">${this.#charBin}</code>,
                 <code title="Hexadecimal">${this.#charHex}</code>,
                 <code title="Decimal">${this.#charDec}</code>)
            </summary>
            <table class="bytes">
                ${this.#bytes.map((byte) => this.renderTableRow(byte)).join("\n")}
            </table>
        </details>`;
    }

    renderTableRow(byte) {
        return `
        <tr>
            <td>
                <ol>
                    ${[...byte.parsed.continuation].map(bit => this.renderOrderedListItem(bit, true)).join("\n")}
                    ${[...byte.parsed.remainder].map(bit => this.renderOrderedListItem(bit)).join("\n")}
                </ol>
            </td>
            <td>
                (<code title="Decimal">${byte.dec}</code>,
                 <code title="UTF-8 Decimal">${byte.val}</code>,
                 <code title="Hexadecimal">${byte.hex}</code>,
                 <code title="Binary">${byte.bin}</code>)
            </td>
        </tr>`;
    }

    renderOrderedListItem(bit, continuation) {
        if (continuation) {
            return `<li class="continuation" title="Continuation Bit">${bit}</li>`;
        }

        return `<li title="Remainder Bit">${bit}</li>`;
    }
}