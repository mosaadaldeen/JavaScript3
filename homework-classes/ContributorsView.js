'use strict';

{
    const {
        createAndAppend
    } = window.Util;

    class ContributorsView {
        constructor(container) {
            this.container = container;
        }

        update(state) {
            if (!state.error) {
                this.render(state.contributors);
            }
        }

        /**
         * Renders the list of contributors
         * @param {Object[]} contributors An array of contributor objects
         */
        render(contributors) {
            this.container.innerHTML = '';
            contributors.forEach(responseInfo => {
                const contributor = createAndAppend('a', this.container, {
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
        }
    }

    window.ContributorsView = ContributorsView;
}