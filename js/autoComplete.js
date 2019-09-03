// #1 - Search configuration - To replace with your own
const ALGOLIA_APPID = '';
const ALGOLIA_SEARCH_APIKEY = '';
const ALGOLIA_INDEX_NAME = 'actors';
const NB_RESULTS_DISPLAYED = 5;
// #2- Algolia API Client Initialization
const algoliaClient = new algoliasearch(ALGOLIA_APPID, ALGOLIA_SEARCH_APIKEY);
const index = algoliaClient.initIndex(ALGOLIA_INDEX_NAME);
let lastQuery = '';
$('#textAreaCompilador').textcomplete([
  {
    // #3 - Regular expression used to trigger the autocomplete dropdown
    match: /(^|\s)@(\w*(?:\s*\w*))$/,
    // #4 - Function called at every new keystroke
    search(query, callback) {
      lastQuery = query;
      index.search(lastQuery, { hitsPerPage: NB_RESULTS_DISPLAYED })
        .then(content => {
          if (content.query === lastQuery) {
            callback(content.hits);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // #5 - Template used to display each result obtained by the Algolia API
    template({_highlightResult}) {
      // Returns the highlighted version of the name attribute
      return _highlightResult.name.value;
    },
    // #6 - Template used to display the selected result in the textarea
    replace({name}) {
      return ` @${name.trim()} `;
    }
  }
], {
  footer: '&lt;div style="text-align: center; display: block; font-size:12px; margin: 5px 0 0 0;"&gt;Powered by &lt;a href="http://www.algolia.com"&gt;&lt;img src="https://www.algolia.com/assets/algolia128x40.png" style="height: 14px;" /&gt;&lt;/a&gt;&lt;/div&gt;'
});
