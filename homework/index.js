'use strict'; {
    async function fetchJSON(url) {
        const fetchWithAxios = await axios.get(url).then((res) => {
            return res.data;
        });
        return fetchWithAxios;
    }

    const createAndAppend = (name, parent, options = {}) => {
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
    };

    const headerHYF = () => {
        const header = document.getElementById('header');
        return header;
    };

    const addInfo = (repo, repoContainer) => {
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
        const link = createAndAppend('li', row1);
        createAndAppend('a', link, {
            text: repo.name,
            href: repo.html_url,
            class: 'link',
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
    };

    const handleError = (err) => {
        createAndAppend('p', root, {
            text: err.message,
            class: 'alert-error',
        });
        return;
    };

    async function contributorDetail(repo) {
        const contributorSection = document.getElementById('contributor');
        const contributorUrl = `https://api.github.com/repos/HackYourFuture/${repo}/contributors`;
        try {
            await fetch(contributorUrl)
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
                });
        } catch (error) {
            handleError(error);
        }
    }

    async function renderInfo(url, header) {
        try {
            const select = createAndAppend('select', header, {
                class: 'repo_selector'
            });
            const repoContainer = document.getElementById('repository');
            const contributorSection = document.getElementById('contributor');
            await fetch(url)
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
                        contributorDetail(repositories[select.value].name);
                    });
                    addInfo(repositories[select.value], repoContainer);
                    contributorDetail(repositories[select.value].name);
                });
        } catch (err) {
            handleError(err);
        }
    }

    async function main(url) {
        try {
            await fetchJSON(url);
            await renderInfo(url, headerHYF());
        } catch (error) {
            handleError(error);
        }
    }

    const HYF_REPOS_URL =
        'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    window.onload = () => main(HYF_REPOS_URL);
}