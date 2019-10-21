const SerpWow = require('google-search-results-serpwow');
// create the serpwow object
const serpwow = new SerpWow('02726F437EFB47BAABF8368C718AFD64');

/**
 * return top 10 organic search results from google
 * https://www.npmjs.com/package/google-search-results-serpwow
 * @param {String} what the user inputs
 * @return {[Objects]} what the function returns
 */
const getSearchResults = async (queryString) => {
  return new Promise(async (resolve, reject) => {
    let result = await serpwow.json({
      q: queryString,
      gl: 'ca',
      hl: 'en',
      location: 'Toronto,Ontario,Canada',
      google_domain: 'google.ca'
    });
    try {
      // pretty-print the result
      // console.log(result.organic_results);
      resolve(result.organic_results);
    } catch(err) {
      reject(err.message);
    }
  });
}

module.exports = { getSearchResults };
