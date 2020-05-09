'use strict';

{
    function fetchJSON(url, cb) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status <= 299) {
                cb(null, xhr.response);
            } else {
                cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
            }
        };
        xhr.onerror = () => cb(new Error('Network request failed'));
        xhr.send();
    }

    function createAndAppend(name, parent, options = {}) {
        const elem = document.createElement(name);
        parent.appendChild(elem);
        Object.entries(options).forEach(([key, value]) => {
            if (key === 'text') {
                elem.textContent = value;
            } else {
                elem.setAttribute(key, value);
            }
        });
        return elem;
    }

    function headerHYF() {
        const header = createAndAppend('div', root, {
            class: "headerHYF"
        });
        createAndAppend('h2', header, {
            text: "HYF repositories"
        });
    }

    function addInfo(repo) {
        const createTable = createAndAppend('div', root, {
            class: "block"
        });
        const row1 = createAndAppend('div', createTable, {
            class: "row"
        });
        createAndAppend('span', row1, {
            text: 'repository:  ',
            class: 'bold-title'
        });
        createAndAppend('a', row1, {
            text: repo.name,
            href: repo.html_url
        });
        const row2 = createAndAppend('div', createTable, {
            class: 'row'
        });
        createAndAppend('span', row2, {
            text: 'description:',
            class: 'bold-title'
        });
        createAndAppend('span', row2, {
            text: repo.description
        });

        const row3 = createAndAppend('div', createTable, {
            class: 'row'
        });
        createAndAppend('span', row3, {
            text: 'forks: ',
            class: 'bold-title'
        });
        createAndAppend('span', row3, {
            text: repo.forks
        });

        const row4 = createAndAppend('div', createTable, {
            class: 'row'
        });
        createAndAppend('span', row4, {
            text: 'updates: ',
            class: 'bold-title'
        });
        createAndAppend('span', row4, {
            text: new Date(repo.updated_at).toLocaleString()
        });
    }

    function main(url) {
        headerHYF();
        fetchJSON(url, (err, repos) => {
            const root = document.getElementById('root');
            if (err) {
                let throwError = createAndAppend('p', root, {
                    text: err.message,
                    class: 'alert-error',
                });
                return throwError;
            } else {
                repos.sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    })
                    .forEach(repo =>
                        addInfo(repo)
                    );
            }
        });
    }

    const HYF_REPOS_URL =
        'https://api.github.com/orgs/HackYourFuture/repos?per_page=10';
    window.onload = () => main(HYF_REPOS_URL);
}