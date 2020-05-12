'use strict'; {
    function fetchJSON(url) {
        fetch(url)
            .then(response => response.json())
            .catch(err => handleError(err));
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

    function headerHYF(root) {
        const header = createAndAppend('header', root, {
            class: "header"
        });
        createAndAppend('h2', header, {
            text: "HYF repositories"
        });
        return header;
    }

    function addInfo(repo, repoContainer) {
        const createTable = createAndAppend('div', repoContainer, {
            class: "block"
        });
        const row1 = createAndAppend('ul', createTable, {
            class: "row"
        });
        createAndAppend('li', row1, {
            text: 'repository:  ',
            class: 'bold-title'
        });
        createAndAppend('a', row1, {
            text: repo.name,
            href: repo.html_url,
            target: '_blank'
        });
        const row2 = createAndAppend('ul', createTable, {
            class: 'row'
        });
        createAndAppend('li', row2, {
            text: 'description:',
            class: 'bold-title'
        });
        createAndAppend('li', row2, {
            text: repo.description
        });
        const row3 = createAndAppend('ul', createTable, {
            class: 'row'
        });
        createAndAppend('li', row3, {
            text: 'forks: ',
            class: 'bold-title'
        });
        createAndAppend('li', row3, {
            text: repo.forks
        });
        const row4 = createAndAppend('ul', createTable, {
            class: 'row'
        });
        createAndAppend('li', row4, {
            text: 'updates: ',
            class: 'bold-title'
        });
        createAndAppend('li', row4, {
            text: new Date(repo.updated_at).toLocaleString()
        });
    }

    function handleError(err) {
        createAndAppend('p', root, {
            text: err.message,
            class: 'alert-error',
        });
        return;
    }

    function contributors(url, header) {
        let root = document.getElementById('root');
        const select = createAndAppend('select', header, {
            class: 'repo_selector'
        });
        const mainContainer = createAndAppend('main', root, {
            class: "main-container"
        });
        const repoContainer = createAndAppend('section', mainContainer, {
            class: "repo-container"
        });
        const contributorSection = createAndAppend('section', mainContainer, {
            class: "contributors-container"
        });
        fetch(url)
            .then(response => response.json())
            .then(repositories => {
                repositories.sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    })
                    .forEach((repo, index) => {
                        createAndAppend('option', select, {
                            text: repo.name,
                            value: index
                        });
                    });
                select.addEventListener('change', () => {
                    repoContainer.innerHTML = '';
                    contributorSection.innerHTML = '';
                    addInfo(repositories[select.value], repoContainer);
                    fetch(`https://api.github.com/repos/HackYourFuture/${repositories[select.value].name}/contributors`)
                        .then(data => data.json())
                        .then(response => {
                            response.forEach(responseInfo => {
                                const contributor = createAndAppend('a', contributorSection, {
                                    class: 'contributor',
                                    target: '_blank',
                                    href: responseInfo.html_url
                                });
                                const img = createAndAppend('img', contributor, {
                                    src: responseInfo.avatar_url,
                                    class: 'image-contributor'
                                });
                                const h4 = createAndAppend('h4', contributor, {
                                    text: responseInfo.login,
                                    class: 'name-contributor'
                                });
                                const h5 = createAndAppend('h5', contributor, {
                                    text: responseInfo.contributions,
                                    class: 'contributions'
                                });
                            });
                        }).catch(err => {
                            handleError(err);
                        });
                });
            }).catch(err => {
                handleError(err);
            });
    }

    function main(url) {
        const root = document.getElementById('root');
        const header = headerHYF(root);
        fetch(url)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => {
                handleError(err);
            });
        contributors(url, header);
    }

    const HYF_REPOS_URL =
        'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    window.onload = () => main(HYF_REPOS_URL);
}