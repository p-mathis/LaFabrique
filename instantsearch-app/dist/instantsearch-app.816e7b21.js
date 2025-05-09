const { algoliasearch, instantsearch } = window;
const searchClient = algoliasearch('SUBMLTW9DF', 'dff25b3f9155d0fb38d37dd3f1ddb5f7');
const search = instantsearch({
    indexName: 'lafabrique_netlify_app_submltw9df_pages',
    searchClient,
    future: {
        preserveSharedStateOnUnmount: true
    }
});
search.addWidgets([
    instantsearch.widgets.searchBox({
        container: '#searchbox'
    }),
    instantsearch.widgets.hits({
        container: '#hits',
        templates: {
            item: (hit, { html, components })=>html`
        <article>
          <img src=${hit.image} alt=${hit.title} />
          <div>
            <h1>${components.Highlight({
                    hit,
                    attribute: 'title'
                })}</h1>
            <p>${components.Highlight({
                    hit,
                    attribute: 'description'
                })}</p>
            <p>${components.Highlight({
                    hit,
                    attribute: 'keywords'
                })}</p>
          </div>
        </article>
      `
        }
    }),
    instantsearch.widgets.configure({
        hitsPerPage: 8
    }),
    instantsearch.widgets.pagination({
        container: '#pagination'
    })
]);
search.start();

//# sourceMappingURL=instantsearch-app.816e7b21.js.map
