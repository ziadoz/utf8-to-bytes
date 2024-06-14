import CharToBytes from 'char-to-bytes';
import ready from 'ready';
import { strToChars } from 'utf8';

customElements.define('char-to-bytes', CharToBytes);

ready(() => {
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();

        const output = document.querySelector('.results');
        const chars = strToChars(document.querySelector('input[name="query"]').value);

        Array.from(document.querySelectorAll('.results > char-to-bytes'))
            .map(charToBytes => charToBytes.remove());

        chars.map((char) => {
            const charToBytes = document.createElement('char-to-bytes');
            charToBytes.setAttribute('char', char);

            output.append(charToBytes);
        });
    });

    document.querySelector('a.toggle').addEventListener('click', (event) => {
        event.preventDefault();

        const selector = event.target.textContent.includes('Collapse')
            ? 'details[open]'
            : 'details:not([open])';

        event.target.textContent = event.target.textContent.includes('Collapse')
            ? 'Expand All'
            : 'Collapse All';

        event.target.classList.toggle('collapse');

        document.querySelectorAll(selector).forEach(details => {
            details.toggleAttribute('open');
        });
    });
});