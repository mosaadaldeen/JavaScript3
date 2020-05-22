'use strict';

{
    const {
        createAndAppend
    } = window.Util;

    class RepoView {
        constructor(container) {
            this.container = container;
        }

        update(state) {
            if (!state.error) {
                this.render(state.selectedRepo);
            }
        }

        /**
         * Renders the repository details.
         * @param {Object} repo A repository object.
         */
        render(repo) {
            this.container.innerHTML = '';
            const createTable = createAndAppend('div', this.container, {
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
        }
    }

    window.RepoView = RepoView;
}