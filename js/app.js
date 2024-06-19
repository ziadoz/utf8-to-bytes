import CharToBytes from 'char-to-bytes';
import ready from 'ready';
import { strToChars } from 'utf8';

customElements.define('char-to-bytes', CharToBytes);

// Render the results.
const render = (query) => {
    const chars = strToChars(query);
    const output = document.querySelector('.results');

    Array.from(document.querySelectorAll('.results > char-to-bytes'))
        .map(charToBytes => charToBytes.remove());

    chars.map((char) => {
        const charToBytes = document.createElement('char-to-bytes');
        charToBytes.setAttribute('char', char);

        output.append(charToBytes);
    });
};

// Update the input, toggle and querystring.
const update = (query) => {
    document.querySelector('input[name="query"]').value = query;
    document.querySelector('a.toggle').textContent = 'Collapse All';

    const url = new URL(window.location.href);

    if (query !== '') {
        url.searchParams.set('query', query);
    } else {
        url.searchParams.delete('query');
    }

    history.replaceState(history.state, '', url.href);
};

ready(() => {
    window.addEventListener('load', (event) => {
        const query = new URLSearchParams(window.location.search).get('query') ?? '';

        if (query !== '') {
            render(query);
            update(query);
        }
    });


    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();

        const query = document.querySelector('input[name="query"]').value;

        render(query);
        update(query);
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