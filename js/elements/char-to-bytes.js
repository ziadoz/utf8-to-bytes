import { binToDec, binToHex, byteToBin, byteToHex, charToBytes, parseBin } from 'utf8';

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

        // console.debug(
        //     this.#char,
        //     this.#charDec,
        //     this.#charHex,
        //     this.#charBin,
        //     this.#bytes,
        // );

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
                ${this.#bytes.map((byte, index) => this.renderTableRow(index, byte)).join("\n")}
            </table>
        </details>`;
    }

    renderTableRow(index, byte) {
        return `
        <tr>
            <th>Byte ${index + 1}:</th>
            <td>
                <ol>
                    <li class="continuation">1</li>
                    <li class="continuation">1</li>
                    <li class="continuation">1</li>
                    <li class="continuation">0</li>
                    <li>0</li>
                    <li>0</li>
                    <li>0</li>
                    <li>0</li>
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

    }

    /*
    this.append(this.createTable());

    createTable() {
        const table = document.createElement('table');
        table.classList.add('bytes');

        for (const [index, byte] of Object.entries(charToBytes(this.#char))) {
            console.log(index, byte, this.createOrderedList(byte));
        }

        return table;
    }

    createTableRow(index, byte) {
        const tr = document.createElement('tr');

        const th = document.createElement('th');
        th.textContent = `Byte ${index + 1}`;
        tr.append(th);

        const tdBytes = document.createElement('td');
        tdBytes.append(this.createOrderedList(byte));

        const tdExtra = document.createElement('td');

        // const bin = byteToBin(b);
        // const hex = byteToHex(b);
        // const parse = parseBin(bin);
        // number += parse.remainder;
        //
        // console.log(c, bin, hex, binToDec(parse.remainder), parse);
        //
    }

    createOrderedList(byte) {
        const parsed = parseBin(byteToBin(byte));

        const ol = document.createElement('ol');

        for (const bit in parsed.continuation) {
            const li = document.createElement('li');
            li.classList.add('continuation');
            li.textContent = bit;
            ol.append(li);
        }

        for (const bit in parsed.remainder) {
            const li = document.createElement('li');
            li.textContent = bit;
            ol.append(li);
        }

        return ol;
    }
    */
}